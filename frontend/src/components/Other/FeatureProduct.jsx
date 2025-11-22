import React from 'react'
import {  useQuery } from "@tanstack/react-query"
import { getFeaturedProductApi } from '@/Api/ProductApi/product.api'
import { useAddToCartMutation } from '@/hooks/Cart/cart.hook'

const FeatureProduct = () => {
  const {data } = useQuery({
    queryKey:['GetFeaturedProduct'],
    queryFn:getFeaturedProductApi
  })

  //  console.log(data?.products)
  //  
  const {mutate} = useAddToCartMutation()
   const cartHandler=(productId)=>{
    const payload ={productId}
    console.log(data)
    mutate(payload)
    
   }

  return (
    <div className='flex flex-col m-16 mt-16'>
      <h1 className='text-center text-[5vw] font-medium tracking-tighter'>Featured Products</h1>
     <div className='flex items-center justify-start mt-9'>
       {
        data?.products.map((item,index)=>{
          return(
            <div key={index} className='h-[52vh] w-[18vw] bg-yellow-400 p-2'>
            <div className='w-full h-[80%] bg-red-600'>
              <img src={item?.image} className='h-full w-full object-cover' alt="" />
            </div>
            <div className='flex  items-start justify-between mt-3'>
              <div>
              <h1>{item.name}</h1>
              <h1>{item.price} Rs.</h1>
            </div>
            <div>
             <h1 className='cursor-pointer' onClick={()=>cartHandler(item._id)}>Add to cart</h1>
            </div>
            </div>
            </div>
          )
        })
      }
     </div>
    </div>
  )
}

export default FeatureProduct