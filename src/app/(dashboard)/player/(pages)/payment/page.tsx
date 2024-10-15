"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Log the start of the checkout process
      console.log("Starting the checkout process...");

      // Send a POST request to your backend to create the Stripe session
      const res = await fetch("http://localhost:8800/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log the raw response
      console.log("Backend response status:", res.status);

      // Parse the JSON response
      const session = await res.json();

      // Log the session object
      console.log("Received session from backend:", session);

      // If session has an id or URL, redirect to Stripe checkout page
      if (session?.url) {
        console.log("Redirecting to Stripe checkout with URL:", session.url);
        window.location.href = session.url;
      } else {
        console.error("No session URL received. Something went wrong.");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
    } finally {
      setLoading(false);
      console.log("Checkout process finished.");
    }
  };

  return (
    <div>
      <h1>ACL Checking Payment</h1>
      <h3>MRI Payment</h3>
      <p>Price: $50.00</p>
      <p>Quantity: 1</p>

      <form action="">
        <Button onClick={handleCheckout} disabled={loading}>
          {loading ? "Processing..." : "Proceed to checkout"}
        </Button>
      </form>
    </div>
  );
};

export default Payment;
