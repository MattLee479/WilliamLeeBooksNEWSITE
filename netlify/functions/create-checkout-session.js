const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = (process.env.SITE_URL || "").replace(/\/+$/, "");
const ALLOWED_ORDER_COUNTRY = "GB";

const parseStock = (value) => {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

const getProductStock = (product) => {
  if (!product || !product.metadata) return null;
  return parseStock(product.metadata.stock);
};

const getDefaultPriceId = (product) => {
  if (!product || !product.default_price) return "";
  if (typeof product.default_price === "string") return product.default_price;
  if (typeof product.default_price === "object" && product.default_price.id) {
    return product.default_price.id;
  }
  return "";
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

  if (!stripeSecretKey) {
    return json(500, { error: "Missing STRIPE_SECRET_KEY." });
  }

  if (!siteUrl) {
    return json(500, { error: "Missing SITE_URL." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const customer = payload.customer && typeof payload.customer === "object" ? payload.customer : {};
  const customerCountry = String(customer.country || "").trim().toUpperCase();

  if (!items.length) {
    return json(400, { error: "Basket is empty." });
  }

  if (customerCountry !== ALLOWED_ORDER_COUNTRY) {
    return json(400, { error: "Orders are currently limited to Great Britain delivery addresses." });
  }

  const lineItems = [];
  const qtyByPrice = new Map();
  for (const item of items) {
    const quantity = Number.parseInt(item.quantity, 10);
    const stripePriceId = String(item.stripePriceId || "").trim();

    if (!stripePriceId || !stripePriceId.startsWith("price_")) {
      return json(400, { error: "One or more items are missing valid Stripe price IDs." });
    }

    const safeQty = Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 99) : 1;
    lineItems.push({
      price: stripePriceId,
      quantity: safeQty
    });

    const currentQty = qtyByPrice.get(stripePriceId) || 0;
    qtyByPrice.set(stripePriceId, currentQty + safeQty);
  }

  const stripe = new Stripe(stripeSecretKey);

  const shippingOptions = [];
  const shippingRateId = String(process.env.STRIPE_SHIPPING_RATE_ID || "").trim();
  if (shippingRateId) {
    shippingOptions.push({ shipping_rate: shippingRateId });
  }

  try {
    for (const [priceId, requestedQty] of qtyByPrice.entries()) {
      const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
      const product = price && typeof price.product === "object" ? price.product : null;
      if (!product) continue;

       const defaultPriceId = getDefaultPriceId(product);
      if (!defaultPriceId || price.id !== defaultPriceId) {
        const name = product.name || "This item";
        return json(400, { error: `${name} is not using its default Stripe price.` });
      }

      const stock = getProductStock(product);
      if (stock !== null && requestedQty > stock) {
        const name = product.name || "This item";
        return json(400, { error: `${name} only has ${stock} left in stock.` });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/order-complete.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout.html?canceled=1`,
      customer_email: customer.email || undefined,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: [ALLOWED_ORDER_COUNTRY]
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
        country: customerCountry
      }
    });

    return json(200, { url: session.url });
  } catch (err) {
    return json(500, { error: err && err.message ? err.message : "Stripe session creation failed." });
  }
};
