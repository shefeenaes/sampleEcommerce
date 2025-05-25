"use client";
import { motion } from "framer-motion";

export default function SectionTitle({ title }) {
  const titleMap = {
    category: {
      code: "Category",
      desc: "Browse curated categories that match your lifestyle and taste.",
    },
    popular: {
      code: "Popular",
      desc: "See what everyone’s loving – our most popular picks this week!",
    },
    featured: {
      code: "Featured",
      desc: "Hand-selected products that define style, quality, and value.",
    },
    trending: {
      code: "Trending",
      desc: "Stay ahead of the curve with our hottest trending arrivals.",
    },
  };

  const current = titleMap[title.toLowerCase()] || {
    code: "Section",
    desc: "Explore our latest collections and discover something new today.",
  };

  const firstLetter = current.code.charAt(0).toUpperCase();
  const restOfTitle = current.code.slice(1).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center text-center my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center"
      >
        {/* Circle behind the first letter */}
        <span className="relative flex items-center">
          <span
            className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 
                       w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
                       rounded-full bg-orange-500 z-0"
          ></span>
          <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-white ">
            {firstLetter}
          </span>
        </span>
        <span className="ml-2 text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-gray-800  uppercase">
          {restOfTitle}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl"
      >
        {current.desc}
      </motion.p>
    </div>
  );
}
