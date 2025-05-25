"use client";
import { motion } from "framer-motion";
import { Slider } from "@mui/material";
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

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-64 p-4 md:pr-4   "
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mb-6">
        <h3 className="font-bold mb-2 text-gray-800">Price Filter</h3>
        <p className="text-sm text-gray-600 mb-1">
          Price: AED{priceRange[0].toFixed(2)} — AED{priceRange[1].toFixed(2)}
        </p>
        <Slider
          value={priceRange}
          min={0}
          max={1000}
          step={10}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          sx={{
            color: "#f97316",
          }}
        />
      </div>

      <div>
        <h3 className="font-bold mb-2 text-gray-800">Size</h3>
        <ul className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <li
              key={size}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-500 flex items-center justify-center transition-all">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {size}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
