import Stripe from "stripe";

// Initialize Stripe with proper error handling
let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16", // Use latest API version
  });
} catch (err) {
  console.error("Stripe initialization error:", err);
}

export async function POST(request) {
  // Check if Stripe initialized properly
  if (!stripe) {
    return Response.json(
      { error: "Stripe initialization failed" },
      { status: 500 }
    );
  }

  try {
    const { price, name, address, email, productId, image } =
      await request.json();

    // Validate required fields
    if (!price || !name) {
      return Response.json(
        { error: "Price and name are required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              images: image ? [image] : undefined,
            },
            unit_amount: Math.round(price), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/canceled`,
      metadata: {
        // Store additional data
        productId,
        customerEmail: email,
        customerAddress: address,
      },
    });

    return Response.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe API error:", err);
    return Response.json(
      { error: err.message || "Payment processing failed" },
      { status: 500 }
    );
  }
}
