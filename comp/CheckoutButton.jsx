"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutButton({ product }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    localStorage.setItem(
      "productDetails",
      JSON.stringify({
        productId: product.id,
        price: product.price,
        name: product.name,
        address: product.address,
        email: product.email,
        image: product.image, // <-- add product image here
      })
    );
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          price: product.price,
          name: product.name,
          address: product.address,
          email: product.email,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {loading ? "Processing..." : "Confirm Payment"}
    </button>
  );
}
