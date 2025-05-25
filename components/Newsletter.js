"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-orange-400 overflow-hidden  p-6 sm:p-10 md:p-14 mt-10 text-white text-center"
    >
      <div className="absolute inset-0 w-full h-full bg-[url('/newsletterbg.jpg')] bg-cover opacity-10 pointer-events-none"></div>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 uppercase">
        Sale 20% off all store
      </h3>
      <p className="text-lg sm:text-xl font-semibold mb-6">
        Subscribe our Newsletter
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-3 rounded-l sm:rounded-l-md rounded-md sm:rounded-r-none text-gray-800 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-r sm:rounded-r-md rounded-md sm:rounded-l-none transition-all duration-200"
        >
          Subscribe
        </button>
      </div>
    </motion.div>
  );
}
