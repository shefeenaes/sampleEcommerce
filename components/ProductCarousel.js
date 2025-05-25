"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductCarousel({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?tag=${category}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [category]);

  return (
    <div className="px-6 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
