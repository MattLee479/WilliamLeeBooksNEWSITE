const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

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
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed." });
  }

  if (!stripeSecretKey) {
    return json(500, { error: "Missing STRIPE_SECRET_KEY." });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const productResponse = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
      limit: 100
    });

    const products = productResponse.data
      .map((product) => {
        const defaultPrice = product && typeof product.default_price === "object"
          ? product.default_price
          : null;

        if (!product || !product.active || !defaultPrice || !defaultPrice.active) {
          return null;
        }

        if (defaultPrice.type !== "one_time" || defaultPrice.currency !== "gbp") {
          return null;
        }

        const image = Array.isArray(product.images) && product.images.length
          ? product.images[0]
          : "";
        const stock = getProductStock(product);

        return {
          id: product.id,
          stripePriceId: getDefaultPriceId(product),
          name: product.name || "Untitled product",
          description: product.description || "",
          image,
          badge: "",
          price: typeof defaultPrice.unit_amount === "number" ? defaultPrice.unit_amount / 100 : 0,
          stock
        };
      })
      .filter(Boolean);

    return json(200, { products });
  } catch (err) {
    return json(500, { error: err.message || "Failed to load Stripe products." });
  }
};
