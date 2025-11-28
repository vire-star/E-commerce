import { useState } from "react";
import { useProducts } from "@/hooks/Product/product.hook";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {

  const navigate=  useNavigate()
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [activeSearch, setActiveSearch] = useState("");

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 20,
    search: activeSearch,
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });


  const cartItem = (data)=>{
    // console.log(data)
    navigate(`/product/${data}`)
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput);
  };

  const onCategoryChange = (e) => {
    setPage(1);
    setCategory(e.target.value);
  };

  const onMinPriceChange = (e) => {
    setPage(1);
    setPriceRange((prev) => ({ ...prev, min: e.target.value }));
  };

  const onMaxPriceChange = (e) => {
    setPage(1);
    setPriceRange((prev) => ({ ...prev, max: e.target.value }));
  };

  const resetFilters = () => {
    setSearchInput("");
    setActiveSearch("");
    setCategory("");
    setPriceRange({ min: "", max: "" });
    setPage(1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  // ✅ Check if products array is empty
  const hasProducts = data?.products && data.products.length > 0;

  return (
    <div className="p-4">
      {/* Filter UI */}
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
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

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={onCategoryChange}
            className="border rounded px-2 py-1 w-48"
          >
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            value={priceRange.min}
            onChange={onMinPriceChange}
            placeholder="0"
            className="border rounded px-2 py-1 w-32"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={priceRange.max}
            onChange={onMaxPriceChange}
            placeholder="10000"
            className="border rounded px-2 py-1 w-32"
          />
        </div>

        <button
          onClick={resetFilters}
          className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* ✅ Empty state message */}
      {!hasProducts ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            {category || activeSearch || priceRange.min || priceRange.max
              ? `No products found${category ? ` in "${category}" category` : ''}${activeSearch ? ` matching "${activeSearch}"` : ''}`
              : "No products available"}
          </p>
          {(category || activeSearch || priceRange.min || priceRange.max) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-blue-500 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Products grid */}
          <div className="grid grid-cols-4 gap-4">
            {data.products.map((p) => (
              <div onClick={()=>cartItem(p._id)} key={p._id} className="border p-2 rounded">
                <h1 className="font-medium">{p.name}</h1>
                <p className="text-sm text-gray-600">{p.price} Rs</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
        </>
      )}
    </div>
  );
};

export default AllProduct;
