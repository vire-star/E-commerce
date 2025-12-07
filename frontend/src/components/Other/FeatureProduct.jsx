import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { getFeaturedProductApi } from '@/Api/ProductApi/product.api'
import { useAddToCartMutation } from '@/hooks/Cart/cart.hook'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const FeatureProduct = () => {
  const navigate = useNavigate()
  const [loadingProductId, setLoadingProductId] = useState(null) // ✅ Track which product is loading
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['GetFeaturedProduct'],
    queryFn: getFeaturedProductApi
  })

  const { mutate, isPending } = useAddToCartMutation()
  
  const cartHandler = (productId, e) => {
    e.stopPropagation()
    setLoadingProductId(productId) // ✅ Set loading for this specific product
    
    mutate({ productId }, {
      onSuccess: () => {
        setLoadingProductId(null) // ✅ Clear loading after success
      },
      onError: () => {
        setLoadingProductId(null) // ✅ Clear loading after error
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (isError || !data?.products?.length) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <h2 className='text-2xl font-semibold text-gray-700'>No Featured Products Available</h2>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      {/* Section Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2'>
          Featured Products
        </h2>
        <p className='text-gray-600 text-sm'>Handpicked favorites just for you</p>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {data?.products.map((item) => (
          <div 
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group'
          >
            {/* Product Image */}
            <div className='relative aspect-square bg-gray-50 overflow-hidden'>
              <img 
                src={item?.image} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                alt={item.name} 
              />
              
              {/* Featured Badge */}
              <div className='absolute top-3 left-3'>
                <span className='bg-black text-white text-xs font-semibold px-2.5 py-1 rounded'>
                  Featured
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className='p-4'>
              <div className='mb-3'>
                <h3 className='font-semibold text-base text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors'>
                  {item.name}
                </h3>
                <p className='text-gray-900 font-bold text-lg'>
                  ₹{item.price}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => cartHandler(item._id, e)}
                disabled={loadingProductId === item._id} // ✅ Only disable this specific button
                className='w-full bg-black text-white py-2.5 px-4 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {loadingProductId === item._id ? <Spinner /> : 'Add to Cart'} 
                {/* ✅ Only show spinner for this product */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureProduct
