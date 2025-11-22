import AllProduct from '@/components/Other/AllProduct'
import FilterSection from '@/components/Other/FilterSection'
import SearchArea from '@/components/Other/SearchArea'
import React from 'react'

const Product = () => {
  return (
    <div className='h-[87vh] w-full   '>
        <div>
            <SearchArea/>
        </div>
        <div className='flex   '>
            <FilterSection/>
            <AllProduct/>
        </div>
    </div>
  )
}

export default Product