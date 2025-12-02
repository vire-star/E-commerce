// src/components/Other/AllProduct.jsx
import { useProducts } from '@/hooks/Product/product.hook';
import { useNavigate } from 'react-router-dom';

const AllProduct = ({ page, setPage, activeSearch, category, priceRange }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 20,
    search: activeSearch,
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">Something went wrong</p>
          <p className="text-gray-500 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  const hasProducts = data?.products && data.products.length > 0;

  return (
    <div className="flex-1">
      {!hasProducts ? (
        <div className="text-center py-24 bg-gray-50 rounded-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-900 text-lg font-semibold mb-2">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <>
          {/* Products Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{data.products.length}</span> of <span className="font-semibold text-gray-900">{data.total}</span> products
            </p>
            <p className="text-sm text-gray-500">
              Page {data?.page} of {data?.totalPages || 1}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-base text-gray-900 mb-2 truncate group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Price Section */}
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-bold text-lg">
                      ₹{product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-gray-500 text-sm line-through">
                        ₹{product.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Category Badge */}
                  {product.category && (
                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-gray-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-2 px-4">
              <span className="text-sm font-medium text-gray-900">
                {data?.page}
              </span>
              <span className="text-sm text-gray-500">
                of
              </span>
              <span className="text-sm font-medium text-gray-900">
                {data?.totalPages || 1}
              </span>
            </div>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
