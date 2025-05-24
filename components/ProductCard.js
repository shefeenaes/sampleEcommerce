"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 sec
  };

  return (
    <div className="border p-4 rounded shadow-md relative">
      <Toaster position="top-right" />
      <Image
        src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d808becbf7162555033_peep-102.svg"
        alt={product.name}
        className="h-40 w-full object-fit mb-2"
        width={100}
        height={100}
      />
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`mt-2 px-4 py-1 rounded text-white ${
          added ? "bg-green-600" : "bg-blue-500"
        }`}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}
