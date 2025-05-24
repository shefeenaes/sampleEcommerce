"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Move static data outside the component to avoid re-declaring on every render
const BANNERS = [
  { id: "1", image: "/banner/herobanner1.PNG" },
  { id: "2", image: "/banner/herobanner2.PNG" },
  { id: "3", image: "/banner/herobanner3.PNG" },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentBanner = useMemo(() => BANNERS[currentIndex], [currentIndex]);

  if (!currentBanner) return null;

  return (
    <div className="relative w-full h-64 md:h-96 mb-8 rounded overflow-hidden bg-gray-200 shadow">
      <Image
        src={currentBanner.image}
        alt="Shop the latest trends"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Discover the Latest Collections
        </h1>
        <p className="mb-4 text-sm md:text-base">
          Exclusive styles and deals available now
        </p>
        <Link href="/category">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-sm rounded">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
