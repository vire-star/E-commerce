import FeatureProduct from '@/components/Other/FeatureProduct'
import React from 'react'
import CustomerReview from './CustomerReview'

const Home = () => {
  return (
    <div>
      <div className='w-full h-[70vh]'>
        <img src="./img.jpg" alt="Banner" />
       
      </div>
        <FeatureProduct/>
        <CustomerReview/>
    </div>
  )
}

export default Home