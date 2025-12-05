import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteProductFromDB, useProducts, useToggleProduct } from '@/hooks/Product/product.hook'
import { DeleteIcon, EllipsisVertical, Search, Star, StarOff } from 'lucide-react';
import React, { useState } from 'react'

const DashboardProduct = () => {
  const { mutate: toggleFeature, isLoading: toggling } = useToggleProduct();
  
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 20,
    search: activeSearch,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput);
  };

  const toggleProduct = (id) => {
    toggleFeature(id);
  }

  const {mutate:deleteSingleProduct, isPending}=useDeleteProductFromDB()
  const deleteProduct = (id) => {
    // Implement delete product functionality here
    deleteSingleProduct(id)
  }

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Spinner />
          <p className='mt-4 text-gray-600 font-medium'>Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-red-600 text-lg font-semibold'>Failed to load products</p>
          <p className='text-gray-500 text-sm mt-2'>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        
        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Product Management</h1>
          <p className='text-gray-600'>Manage your products and toggle featured status</p>
        </div>

        {/* Search Section */}
        <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
          <form onSubmit={handleSearchSubmit}>
            <div className='flex flex-col sm:flex-row gap-3'>
              <div className='flex-1'>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Search Products
                </label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    value={searchInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchSubmit(e);
                      }
                    }}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search by product name...'
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                  />
                </div>
              </div>
              <div className='flex items-end'>
                <button
                  type='submit'
                  className='bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors'
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stats Bar */}
        <div className='bg-white rounded-lg border border-gray-200 p-4 mb-6'>
          <div className='flex items-center justify-between text-sm'>
            <div className='text-gray-600'>
              Showing <span className='font-semibold text-gray-900'>{data?.products?.length || 0}</span> of <span className='font-semibold text-gray-900'>{data?.total || 0}</span> products
            </div>
            <div className='text-gray-500'>
              Page {data?.page} of {data?.totalPages || 1}
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className='space-y-4'>
          {data?.products?.length === 0 ? (
            <div className='bg-white rounded-lg border border-gray-200 p-12 text-center'>
              <p className='text-gray-600 text-lg font-semibold mb-2'>No products found</p>
              <p className='text-gray-500 text-sm'>Try adjusting your search</p>
            </div>
          ) : (
            data?.products?.map((item) => (
              <div
                key={item._id}
                className='bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
              >
                <div className='p-4 flex items-center justify-between gap-4'>
                  
                  {/* Product Info Section */}
                  <div className='flex items-center gap-4 flex-1 min-w-0'>
                    {/* Product Image */}
                    <div className='w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0'>
                      <img
                        className='w-full h-full object-cover'
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-gray-900 truncate mb-1'>
                        {item.name}
                      </h3>
                      <div className='flex items-center gap-3'>
                        <p className='text-gray-600 text-sm'>
                          ₹{item.price}
                        </p>
                        {item.category && (
                          <span className='inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded'>
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Featured Status Badge */}
                    <div className='flex-shrink-0'>
                      {item.isFeatured ? (
                        <div className='flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg'>
                          <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          <span className='text-sm font-semibold text-yellow-700'>Featured</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg'>
                          <StarOff className='w-4 h-4 text-gray-400' />
                          <span className='text-sm font-medium text-gray-600'>Not Featured</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Menu */}
                  <div className='flex-shrink-0'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                          <EllipsisVertical className='w-5 h-5 text-gray-600' />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className='w-48 p-2'>
                        <button
                          onClick={() => toggleProduct(item._id)}
                          disabled={toggling}
                          className='w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50'
                        >
                          {item.isFeatured ? (
                            <>
                              <StarOff className='w-4 h-4' />
                              Remove Featured
                            </>
                          ) : (
                            <>
                              <Star className='w-4 h-4' />
                              Mark as Featured
                            </>
                          )}
                        </button>
                        <button onClick={()=>deleteProduct(item._id)} className='w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50'>
                         <DeleteIcon className='w-4 h-4'/>
                          {isPending? 'Deleting...':'Delete Product'}
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {data?.products?.length > 0 && (
          <div className='flex items-center justify-center gap-3 mt-8 pt-6 border-t border-gray-200'>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className='px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors'
            >
              Previous
            </button>

            <div className='flex items-center gap-2 px-4'>
              <span className='text-sm font-medium text-gray-900'>
                {data?.page}
              </span>
              <span className='text-sm text-gray-500'>of</span>
              <span className='text-sm font-medium text-gray-900'>
                {data?.totalPages || 1}
              </span>
            </div>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className='px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardProduct
