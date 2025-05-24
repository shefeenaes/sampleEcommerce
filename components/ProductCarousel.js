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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
