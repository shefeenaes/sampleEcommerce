"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function SubcategoryPage() {
  const { categoryId, subCategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 90]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (!categoryId || !subCategoryId) return;

    async function fetchProducts() {
      const res = await fetch(
        `http://localhost:3000/api/products?categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, [categoryId, subCategoryId]);

  const filteredProducts = products.filter((product) => {
    const keyword = searchQuery.toLowerCase();

    const matchesSearch = (text) =>
      text
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word.startsWith(keyword));

    const nameMatches = matchesSearch(product.name);
    const descriptionMatches = matchesSearch(product.description);

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesSize =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);

    return (nameMatches || descriptionMatches) && matchesPrice && matchesSize;
  });

  return (
    <div className="p-6">
      <Breadcrumb />

      <div className="flex flex-col lg:flex-row gap-6">
        <FilterSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredProducts.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition duration-300"
              >
                <div>
                  <Image
                    src={product.image || "/featured/menshirt1.PNG"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
