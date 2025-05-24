"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Implement subscription logic here
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-blue-100 p-6 rounded mt-10 text-center">
      <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
      <p className="mb-4 text-sm text-gray-700">
        Get updates on new arrivals and exclusive offers.
      </p>
      <div className="flex justify-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="px-4 py-2 rounded border w-64"
        />
        <button
          onClick={handleSubscribe}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
