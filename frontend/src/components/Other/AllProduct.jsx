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
      <div className="flex-1 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center h-96">
        <p className="text-red-600">Something went wrong. Please try again.</p>
      </div>
    );
  }

  const hasProducts = data?.products && data.products.length > 0;

  return (
    <div className="flex-1">
      {!hasProducts ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg mb-2">No products found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          {/* Products Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {data.products.length} of {data.total} products
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
                  <p className="text-blue-600 font-bold text-xl">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8 py-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border border-gray-300 px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
            >
              Previous
            </button>

            <span className="font-medium text-gray-700">
              Page {data?.page} of {data?.totalPages || 1}
            </span>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className="border border-gray-300 px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
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
