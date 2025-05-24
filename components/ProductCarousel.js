"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?tag=${category}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [category]);

  return (
    <div className="flex gap-4 overflow-x-auto p-2">
      {products.map((product) => (
        <div key={product.id} className="min-w-[200px]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
