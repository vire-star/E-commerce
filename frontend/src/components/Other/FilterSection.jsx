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
      <div className="sticky top-4 bg-white rounded-lg border border-gray-200 p-6 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          {(category || priceRange.min || priceRange.max) && (
            <button
              onClick={onReset}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Category</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirt">Shirt</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Minimum</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                placeholder="₹ Min"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Maximum</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                placeholder="₹ Max"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(category || priceRange.min || priceRange.max) && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">Applied Filters</h4>
            <div className="flex flex-wrap gap-2">
              {category && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  {category}
                  <button 
                    onClick={() => setCategory('')}
                    className="ml-2 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {priceRange.min && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  Min: ₹{priceRange.min}
                  <button 
                    onClick={() => setPriceRange((prev) => ({ ...prev, min: '' }))}
                    className="ml-2 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {priceRange.max && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  Max: ₹{priceRange.max}
                  <button 
                    onClick={() => setPriceRange((prev) => ({ ...prev, max: '' }))}
                    className="ml-2 hover:text-gray-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
