"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        E-Shop
      </Link>
      <nav className="space-x-4 relative">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/category" className="hover:underline">
          Category
        </Link>
        <Link href="/cart" className="hover:underline relative inline-block">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
