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
  return (
    <div>{id}</div>
  )
}

export default SingleProduct