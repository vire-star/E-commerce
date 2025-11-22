import { useProducts } from '@/hooks/Product/product.hook';
import React, { useState } from 'react'

const AllProduct = () => {
    const [page, setPage] = useState(1);
  const { data, isLoading } = useProducts(page, 20);

  if (isLoading) return <p>Loading...</p>;
  console.log(data)


  return (
    <div className='w-[80vw] h-[170vh] bg-yellow-700'>
         <div>
      {data.products.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {data.page} / {data.totalPages}
        </span>

        <button
          disabled={!data.hasMore}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  )
}

export default AllProduct