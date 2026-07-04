const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const parseStock = (value) => {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

const getProductStock = (product) => {
  if (!product || !product.metadata) return null;
  return parseStock(product.metadata.stock);
};

const adjustStockFromSession = async (stripeClient, sessionId) => {
  if (!stripeClient || !sessionId) return;

  const lineItems = await stripeClient.checkout.sessions.listLineItems(sessionId, {
    limit: 100,
    expand: ["data.price.product"]
  });

  const items = Array.isArray(lineItems.data) ? lineItems.data : [];
  for (const item of items) {
    const quantity = Number.isFinite(item.quantity) ? item.quantity : 0;
    if (quantity <= 0) continue;

    const price = item.price;
    const product = price && typeof price.product === "object" ? price.product : null;
    if (!product || !product.id) continue;

    const stock = getProductStock(product);
    if (stock === null) continue;

    const nextStock = Math.max(0, stock - quantity);
    if (nextStock === stock) continue;

    const existingMetadata = product.metadata && typeof product.metadata === "object"
      ? product.metadata
      : {};

    await stripeClient.products.update(product.id, {
      metadata: { ...existingMetadata, stock: String(nextStock) }
    });
  }
};

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  if (!stripeSecretKey || !webhookSecret) {
    return json(500, { error: "Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET." });
  }

  const signature =
    event.headers["stripe-signature"] ||
    event.headers["Stripe-Signature"] ||
    event.headers["STRIPE-SIGNATURE"];

  if (!signature) {
    return json(400, { error: "Missing Stripe signature header." });
  }

  const stripe = new Stripe(stripeSecretKey);

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return json(400, { error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object;
        console.log("checkout.session.completed", {
          id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_details && session.customer_details.email
        });
        if (session.payment_status === "paid") {
          await adjustStockFromSession(stripe, session.id);
        }
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = stripeEvent.data.object;
        console.log("checkout.session.async_payment_succeeded", { id: session.id });
        await adjustStockFromSession(stripe, session.id);
        break;
      }
      default:
        break;
    }

    return json(200, { received: true });
  } catch (err) {
    return json(500, { error: err.message || "Webhook handler error." });
  }
};
