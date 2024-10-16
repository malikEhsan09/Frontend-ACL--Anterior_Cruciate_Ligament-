"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  interface Payment {
    _id: string;
    amount: number;
    paymentStatus: string;
  }

  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // State for userId

  useEffect(() => {
    // Retrieve userId from local storage when the component mounts
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID not found in local storage.");
    }
  }, []); // Run once on mount

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userId) return; // Exit if userId is not set

      try {
        const response = await axios.get(
          `http://localhost:8800/api/payment/payments/${userId}`
        );
        setPayments(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response ? err.response.data.message : "An error occurred"
          );
        } else {
          setError("An error occurred");
        }
      }
    };

    fetchPayments();
  }, [userId]); // Fetch payments whenever userId changes

  return (
    <div>
      <h2>Your Payments</h2>
      {error && <p>{error}</p>}
      <ul>
        {payments.map((payment) => (
          <li key={payment._id}>
            Amount: ${(payment.amount / 100).toFixed(2)} - Status:{" "}
            {payment.paymentStatus}
            <a href={`api/payment/download-receipt/${payment._id}`}>
              {" "}
              Download Receipt
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
