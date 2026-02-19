const path = require("path");
const express = require("express");
const Stripe = require("stripe");

const app = express();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const siteUrl = (process.env.SITE_URL || "").replace(/\/+$/, "");
const shippingRateId = String(process.env.STRIPE_SHIPPING_RATE_ID || "").trim();

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

const sendJson = (res, statusCode, body) => {
  res.status(statusCode).json(body);
};

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

// Serve static site files
app.use(express.static(path.join(__dirname)));

// Stripe webhook needs raw body
app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), (req, res) => {
  if (!stripe || !webhookSecret) {
    return sendJson(res, 500, { error: "Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET." });
  }

  const signature =
    req.headers["stripe-signature"] ||
    req.headers["Stripe-Signature"] ||
    req.headers["STRIPE-SIGNATURE"];

  if (!signature) {
    return sendJson(res, 400, { error: "Missing Stripe signature header." });
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    return sendJson(res, 400, { error: `Webhook signature verification failed: ${err.message}` });
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
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = stripeEvent.data.object;
        console.log("checkout.session.async_payment_succeeded", { id: session.id });
        break;
      }
      default:
        break;
    }

    return sendJson(res, 200, { received: true });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Webhook handler error." });
  }
});

// JSON body parsing for API routes
app.use(express.json());

app.get("/api/list-products", async (req, res) => {
  if (!stripe) {
    return sendJson(res, 500, { error: "Missing STRIPE_SECRET_KEY." });
  }

  try {
    const priceResponse = await stripe.prices.list({
      active: true,
      type: "one_time",
      expand: ["data.product"],
      limit: 100
    });

    const products = priceResponse.data
      .filter((price) => price.currency === "gbp" && price.product && price.product.active)
      .map((price) => {
        const product = price.product;
        const image = Array.isArray(product.images) && product.images.length
          ? product.images[0]
          : "";

        return {
          id: product.id,
          stripePriceId: price.id,
          name: product.name || "Untitled product",
          description: product.description || "",
          image,
          badge: "",
          price: typeof price.unit_amount === "number" ? price.unit_amount / 100 : 0
        };
      });

    return sendJson(res, 200, { products });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to load Stripe products." });
  }
});

app.post("/api/create-checkout-session", async (req, res) => {
  if (!stripe) {
    return sendJson(res, 500, { error: "Missing STRIPE_SECRET_KEY." });
  }

  if (!siteUrl) {
    return sendJson(res, 500, { error: "Missing SITE_URL." });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const customer = payload.customer && typeof payload.customer === "object" ? payload.customer : {};

  if (!items.length) {
    return sendJson(res, 400, { error: "Basket is empty." });
  }

  const lineItems = [];
  for (const item of items) {
    const quantity = Number.parseInt(item.quantity, 10);
    const stripePriceId = String(item.stripePriceId || "").trim();

    if (!stripePriceId || !stripePriceId.startsWith("price_")) {
      return sendJson(res, 400, { error: "One or more items are missing valid Stripe price IDs." });
    }

    lineItems.push({
      price: stripePriceId,
      quantity: Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 99) : 1
    });
  }

  const shippingOptions = [];
  if (shippingRateId) {
    shippingOptions.push({ shipping_rate: shippingRateId });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout.html?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout.html?canceled=1`,
      customer_email: customer.email || undefined,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "IE", "CA", "AU"]
      },
      phone_number_collection: { enabled: true },
      shipping_options: shippingOptions.length ? shippingOptions : undefined,
      metadata: {
        source: "website-checkout",
        first_name: customer.firstName || "",
        last_name: customer.lastName || "",
        phone: customer.phone || "",
        address_1: customer.address1 || "",
        address_2: customer.address2 || "",
        city: customer.city || "",
        postcode: customer.postcode || "",
        country: customer.country || ""
      }
    });

    return sendJson(res, 200, { url: session.url });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Stripe session creation failed." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
