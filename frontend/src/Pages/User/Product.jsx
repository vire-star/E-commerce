// src/pages/Product.jsx
import AllProduct from '@/components/Other/AllProduct';
import FilterSection from '@/components/Other/FilterSection';
import SearchArea from '@/components/Other/SearchArea';
import React, { useState } from 'react';

const Product = () => {
  // ✅ Sab state parent me define karo
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Search submit handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput);
  };

  // Category change handler
  const handleCategoryChange = (newCategory) => {
    setPage(1);
    setCategory(newCategory);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchInput("");
    setActiveSearch("");
    setCategory("");
    setPriceRange({ min: "", max: "" });
    setPage(1);
  };

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      {/* Search Area */}
      <div className='bg-white shadow-sm'>
        <SearchArea
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>

      {/* Main Content */}
      <div className='flex gap-6 p-6'>
        {/* Filter Section - Left Sidebar */}
        <FilterSection
          category={category}
          setCategory={handleCategoryChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onReset={resetFilters}
        />

        {/* Products Grid - Main Area */}
        <AllProduct
          page={page}
          setPage={setPage}
          activeSearch={activeSearch}
          category={category}
          priceRange={priceRange}
        />
      </div>
    </div>
  );
};

export default Product;
