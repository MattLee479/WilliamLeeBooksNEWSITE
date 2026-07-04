const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

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

  const query = event.queryStringParameters || {};
  const sessionId = String(query.session_id || "").trim();

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return json(400, { error: "Missing or invalid session_id." });
  }

  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return json(200, {
      id: session.id,
      paymentStatus: session.payment_status || null,
      sessionStatus: session.status || null,
      customerEmail:
        (session.customer_details && session.customer_details.email) ||
        session.customer_email ||
        "",
      amountTotal: typeof session.amount_total === "number" ? session.amount_total : null,
      currency: session.currency || null
    });
  } catch (err) {
    return json(500, { error: err && err.message ? err.message : "Failed to load Stripe checkout session." });
  }
};
