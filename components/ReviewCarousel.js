"use client";

import { useEffect, useState } from "react";

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [reviews]);

  if (reviews.length === 0) return <p>Loading reviews...</p>;

  const currentReview = reviews[currentIndex];

  return (
    <div className="flex justify-center items-center p-4 h-40 w-full">
      <div className="max-w-md w-full p-4 rounded-lg shadow bg-white text-center transition-all duration-500 ease-in-out">
        <p className="italic text-sm text-gray-700">{currentReview.review}</p>
        <div className="mt-3 text-right text-sm text-gray-500">
          — {currentReview.name}
        </div>
      </div>
    </div>
  );
}
