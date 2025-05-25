"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        reviews.length ? (prevIndex + 1) % reviews.length : 0
      );
    }, 5000);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length === 0) return;

    startAutoSlide();
    return () =>
      intervalRef.current ? clearInterval(intervalRef.current) : null;
  }, [reviews, startAutoSlide]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    startAutoSlide();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    startAutoSlide();
  };

  if (reviews.length === 0) {
    return (
      <div className="relative flex flex-col justify-center items-center p-10 bg-gray-50 min-h-[300px] mb-52 animate-pulse">
        <div className="text-sm text-gray-400 mb-2">The Reviews Are In</div>

        {/* Stars */}
        <div className="flex text-yellow-300 text-xl mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Skeleton Content */}
        <div className="relative w-full max-w-2xl text-center px-4">
          <p className="text-lg leading-relaxed text-gray-300 bg-gray-200 h-6 mb-4 rounded w-3/4 mx-auto"></p>
          <p className="text-lg leading-relaxed text-gray-300 bg-gray-200 h-6 mb-4 rounded w-2/3 mx-auto"></p>
          <p className="text-lg leading-relaxed text-gray-300 bg-gray-200 h-6 mb-6 rounded w-1/2 mx-auto"></p>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-300 shadow" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute left-40 top-1/2 transform -translate-y-1/2">
          <div className="bg-white p-4 rounded-full shadow">
            <IoIosArrowBack size={24} className="text-gray-300" />
          </div>
        </div>
        <div className="absolute right-40 top-1/2 transform -translate-y-1/2">
          <div className="bg-white p-4 rounded-full shadow">
            <IoIosArrowForward size={24} className="text-gray-300" />
          </div>
        </div>
      </div>
    );
  }

  const { review, name, avatar } = reviews[currentIndex];

  return (
    <div className="relative flex flex-col justify-center items-center px-4 py-10 sm:px-8 md:px-16 bg-gray-50 min-h-[300px] mb-52 sm:mb-32">
      <div className="text-xs sm:text-sm text-gray-600 mb-2">
        The Reviews Are In
      </div>

      {/* Stars */}
      <div className="flex text-yellow-400 text-lg sm:text-xl mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Review Content */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 text-center px-2 sm:px-4"
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-900 mb-6">
              “{review}”
            </p>

            <div className="flex flex-col items-center gap-2">
              <Image
                src={avatar}
                alt="Reviewer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border shadow"
                width={100}
                height={100}
              />
              <div className="font-semibold text-sm sm:text-base">{name}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 sm:left-10 lg:left-40">
        <button
          onClick={handlePrev}
          className="bg-white p-3 sm:p-4 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Previous review"
        >
          <IoIosArrowBack size={20} className="sm:size-6" />
        </button>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 sm:right-10 lg:right-40">
        <button
          onClick={handleNext}
          className="bg-white p-3 sm:p-4 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Next review"
        >
          <IoIosArrowForward size={20} className="sm:size-6" />
        </button>
      </div>
    </div>
  );
}
