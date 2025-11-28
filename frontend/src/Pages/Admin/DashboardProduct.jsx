import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useProducts, useToggleProduct } from '@/hooks/Product/product.hook'
import { EllipsisVertical } from 'lucide-react';

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


  const toggleProduct=(id)=>{
    toggleFeature(id);
  }

   if (isLoading) return <div className='h-screen w-screen flex items-center justify-center'><Spinner/></div>;

  console.log(data)
  return (
    <div className='h-screen w-screen overflow-hidden overflow-y-auto'>
      <h1>update Feature</h1>

      <form onSubmit={handleSearchSubmit} className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
               onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearchSubmit(e);
        }
      }}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="border rounded px-2 py-1 w-64"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </form>

      <div className='mt-28'>
        {
        data?.products?.map((item,index)=>{
          return(
            <div   key={index} className='w-full h-[10vh] bg-red-600 m-4  flex items-center justify-between px-16'>

             <div className='w-full h-[10vh] flex items-center justify-start gap-6'>
               <img className='h-full object-contain' src={item.image} alt="" />
              {item.name}
             <div className='mx-8'>
              {item.isFeatured ? "Featured" : "Not Featured"}
              {/* {String(item.isFeatured)} */}
             </div>
              
             </div>
<Popover>
  <PopoverTrigger>

              <EllipsisVertical/>
  </PopoverTrigger>
  <div onClick={()=>toggleProduct(item._id)}>

  < PopoverContent className='h-fit w-fit'>
    <h1 >adf</h1>
  </PopoverContent>
  </div>
</Popover>

            </div>
          )
        })
      }
      </div>
      <div className="flex items-center gap-4 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {data?.page} / {data?.totalPages || 1}
            </span>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className="border px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        
    </div>
  )
}

export default DashboardProduct