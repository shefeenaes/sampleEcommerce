"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CategorySkeleton from "@/components/ui/CategorySkeleton";

// Function to fetch all categories
async function fetchCategories() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/categories`
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default function SubCategoryPage({ params }) {
  const { categoryId } = use(params); // ✅ This line fixes the warning

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        const found = categories.find((cat) => cat.id === categoryId);
        setCategory(found || null);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Breadcrumb />
        <CategorySkeleton />
      </div>
    );
  }

  if (!category) {
    return <p className="p-6 text-red-600">Category not found</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb />
      <h1 className="text-3xl font-semibold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {category.subcategories.map((sub) => (
          <motion.div
            key={sub.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-md transition duration-200"
          >
            <Link href={`/category/${categoryId}/${sub.id}`}>
              <div className="w-full h-60 bg-gray-100 overflow-hidden">
                <Image
                  src={sub.image || `/categories/${categoryId}/${sub.id}.jpg`}
                  width={400}
                  height={300}
                  alt={sub.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-medium text-gray-800">
                  {sub.name}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
