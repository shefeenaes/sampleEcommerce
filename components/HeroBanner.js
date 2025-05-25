"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button";

// Move static data outside the component to avoid re-declaring on every render
const BANNERS = [
  { id: "1", image: "/banner/banner1.jpg" },
  { id: "2", image: "/banner/banner2.jpg" },
  { id: "3", image: "/banner/banner3.jpg" },
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
        <h1 className="flex text-2xl md:text-4xl font-bold mb-2 items-center justify-center">
          {/* Mobile: Plain D */}
          <span className="block md:hidden text-white font-semibold uppercase">
            Discover the Latest Collections
          </span>

          {/* Tablet & Desktop: D with Circle + Rest */}
          <span className="hidden md:flex items-center">
            {/* D with circle */}
            <span className="relative inline-flex items-center justify-center">
              <span
                className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 
                 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 
                 rounded-full bg-orange-500 z-0"
              ></span>
              <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-white">
                D
              </span>
            </span>

            {/* Rest of the title */}
            <span className="ml-2 text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-white uppercase">
              iscover the Latest Collections
            </span>
          </span>
        </h1>

        <p className="mb-4 text-sm md:text-base">
          Exclusive styles and deals available now
        </p>
        <Button href="/category">Shop Now</Button>
      </div>
    </div>
  );
}
