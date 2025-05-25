"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
export default function SubcategoryPage() {
  const { categoryId, subCategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 90]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryId || !subCategoryId) return;

    async function fetchProducts() {
      setIsLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/products?categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
        { cache: "no-store" }
      );

      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
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

  const skeletonArray = Array(6).fill(null);

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
          {isLoading ? (
            skeletonArray.map((_, index) => (
              <div
                key={index}
                className="animate-pulse border rounded-xl p-4 shadow-sm"
              >
                <div className="bg-gray-200 h-40 w-full rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products match your filters.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
