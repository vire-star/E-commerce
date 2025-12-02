import { Spinner } from '@/components/ui/spinner'
import { useAddToCartMutation } from '@/hooks/Cart/cart.hook'
import { useSingleProduct } from '@/hooks/Product/product.hook'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const {id} = useParams()
  const {data, isError, isLoading} = useSingleProduct(id)
  
  console.log(data)
  if(isError){
    console.log(isError)
  }

  const {mutate, isPending} = useAddToCartMutation()

  const cartHandler = (productId) => {
    mutate({productId})
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load product details</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Product Image Section */}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="w-full max-w-md aspect-square">
            <img 
              className="h-full w-full object-contain" 
              src={data?.image} 
              alt={data?.name || 'Product'}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-center space-y-6">
          
          {/* Product Name */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {data?.name}
          </h1>

          {/* Product Price */}
          {data?.price && (
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold text-gray-900">
                ₹{data.price}
              </span>
              {data?.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{data.originalPrice}
                </span>
              )}
            </div>
          )}

          {/* Product Description */}
          {data?.description && (
            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          {/* Stock Status */}
          {data?.stock !== undefined && (
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${data.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${data.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {data.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            onClick={() => cartHandler(data?._id)}
            disabled={isPending || data?.stock === 0}
            className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? <Spinner /> : 'Add to Cart'}
          </button>

          {/* Additional Product Info */}
          {(data?.category || data?.brand) && (
            <div className="pt-6 space-y-3 text-sm text-gray-600">
              {data?.category && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">Category:</span>
                  <span>{data.category}</span>
                </div>
              )}
              {data?.brand && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">Brand:</span>
                  <span>{data.brand}</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default SingleProduct
