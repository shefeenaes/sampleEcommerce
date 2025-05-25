"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_DURATION = 1500;

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, LOADER_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          role="status"
          aria-busy="true"
        >
          <div className="flex flex-col items-center space-y-4">
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-orange-500"
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.path
                d="M6 6H4M6 6H20L18 14H8M6 6L8 14M8 14L7 17H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.circle cx="9" cy="20" r="1" fill="currentColor" />
              <motion.circle cx="17" cy="20" r="1" fill="currentColor" />
            </motion.svg>
            <p className="text-gray-700 text-sm">Loading FunkySouq Lite...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
