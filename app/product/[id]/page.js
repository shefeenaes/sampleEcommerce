"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import toast, { Toaster } from "react-hot-toast";
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 sec
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

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading product...</div>;
  }

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="min-h-screen  p-6 flex flex-col items-center">
      <Toaster position="top-right" />
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            {product.description}
          </p>
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
      </div>
    </div>
  );
}
