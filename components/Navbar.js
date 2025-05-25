"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { FaOpencart } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 shadow-md z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <span className="text-lg font-semibold text-gray-800">FunkySouq</span>
      </div>

      {/* Center + Right */}
      <div className="flex items-center space-x-6">
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-800">
          <Link href="/" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link href="/category" className="hover:text-orange-500 transition">
            Categories
          </Link>
        </nav>

        {/* Cart Icon */}
        <Link href="/cart" className="relative  text-gray-800">
          <FaOpencart className="text-orange-500 text-2xl" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 md:hidden z-50">
          <nav className="flex flex-col space-y-4 text-sm font-medium text-gray-800">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/category"
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-500"
            >
              Categories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
