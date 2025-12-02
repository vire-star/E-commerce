import React from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchArea = ({ searchInput, setSearchInput, onSearchSubmit }) => {
  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <form onSubmit={onSearchSubmit} className='max-w-3xl mx-auto'>
          <div className='relative'>
            {/* Search Icon */}
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none' />
            
            {/* Input Field */}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products using AI..."
              className="w-full pl-12 pr-32 py-3.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            
            {/* Search Button (Inside Input) */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2"
            >
              <Sparkles className='w-4 h-4' />
              Search
            </button>
          </div>
          
          {/* Helper Text */}
          <p className='text-xs text-gray-500 mt-2 text-center'>
            Powered by AI • Try "red shoes" or "laptop under 50000"
          </p>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
