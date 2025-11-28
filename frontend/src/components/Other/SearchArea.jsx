// src/components/Other/SearchArea.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchArea = ({ searchInput, setSearchInput, onSearchSubmit }) => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-4'>
      <form onSubmit={onSearchSubmit} className='flex items-center gap-3'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
