"use client";
import Image from "next/image";
import Button from "./ui/Button";
import { motion } from "framer-motion";
export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
    >
      <div className="w-full  group transition-transform duration-300 transform hover:scale-[1.02] items-center">
        <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover max-h-full transition duration-300 group-hover:scale-105"
          />
        </div>

        <h2 className="text-base font-semibold text-gray-800 truncate mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>

        <span className="flex justify-center items-center text-center gap-1 text-lg font-bold text-gray-900 mb-3">
          <Image src="/aed.svg" alt="AED Icon" width={20} height={20} />
          {product.price.toFixed(2)}
        </span>

        <Button href={`/product/${product.id}`} className="mt-3 w-full">
          View Product
        </Button>
      </div>
    </motion.div>
  );
}
