"use client";
import { useEffect, useState } from "react";

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
}) {
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <aside className="w-64 pr-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mb-4">
        <h3 className="font-bold mb-2">Price Filter</h3>
        <p>
          Price: AED{priceRange[0].toFixed(2)} — AED{priceRange[1].toFixed(2)}
        </p>
        <input
          type="range"
          min={0}
          max={90}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full mt-2"
        />
      </div>

      <div>
        <h3 className="font-bold mb-2">Size</h3>
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
