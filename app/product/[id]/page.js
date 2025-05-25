"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Breadcrumb from "@/components/Breadcrumb";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ ...product, size: selectedSize, quantity });
    toast.success(`${product.name} added to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?productId=${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="animate-pulse w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-200 h-80 rounded-xl w-full" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) return notFound();

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl flex flex-col space-y-8">
        {/* Top Row: Breadcrumb */}
        <div className="w-full">
          <Breadcrumb />
        </div>

        {/* Second Row: Main Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-start"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-2xl object-cover shadow-lg"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-5"
          >
            <div>
              <h2 className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                SunWaqi
              </h2>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-xs text-orange-500 mt-1 font-medium">
                Central-South Friendship International Trade Co., Ltd
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/aed.svg"
                alt="AED Icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <p className="text-2xl text-orange-600 font-semibold">
                {product.price.toFixed(2)}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      selectedSize === size
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4">
              <Button
                onClick={handleAddToCart}
                disabled={added}
                className="w-full py-3 text-base"
              >
                {added ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Product Meta Info */}
            <div className="text-sm text-gray-500 mt-4 space-y-2">
              <p>SKU: {product.sku || "N/A"}</p>
              <p>Category: {product.category || "General"}</p>
              <div className="flex items-center gap-2">
                <IoMdCheckmarkCircleOutline className="text-orange-500" />
                <span>10 Days Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdCheckmarkCircleOutline className="text-orange-500" />
                <span>Order before 2.30pm for same day dispatch</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
