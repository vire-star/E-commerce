// src/components/Other/FilterSection.jsx
import React from 'react';

const FilterSection = ({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  onReset,
}) => {
  return (
    <div className="w-[20vw] min-w-[250px]">
      <div className="sticky top-4 bg-white rounded-xl shadow-sm p-6 max-h-[85vh] overflow-y-auto">
        <div className='flex items-center justify-between mb-6'>
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Category</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirt">Shirt</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Price Range</h3>
          <div className="space-y-3">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
              placeholder="Min Price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
              placeholder="Max Price"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(category || priceRange.min || priceRange.max) && (
          <div className="pt-4 border-t">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">Active Filters:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {category && <p>• Category: {category}</p>}
              {priceRange.min && <p>• Min: ₹{priceRange.min}</p>}
              {priceRange.max && <p>• Max: ₹{priceRange.max}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
