import { Spinner } from '@/components/ui/spinner'
import { useAddToCartMutation } from '@/hooks/Cart/cart.hook'
import { useSingleProduct } from '@/hooks/Product/product.hook'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {

    const {id} = useParams()
    const {data,isError}=  useSingleProduct(id)
    console.log(data)
    if(isError){
        console.log(isError)
    }

    const {mutate, isPending} = useAddToCartMutation()

    const cartHandler=(productId)=>{
      mutate({productId})
    }
  return (
    <div>
      <div className='h-24 w-24'>
        <img className='h-full w-full object-contain' src={data?.image} alt="" />

      </div>

      <h1>{data?.name}</h1>


      <button onClick={()=>cartHandler(data?._id)}>
        {isPending?<Spinner/>:"Add to Cart"}
      </button>
    </div>
  )
}

export default SingleProduct