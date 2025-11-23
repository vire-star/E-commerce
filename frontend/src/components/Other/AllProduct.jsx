// components/AllProduct.jsx
import { useState } from "react";
import { useProducts } from "@/hooks/Product/product.hook";
import { useDebounce } from "@/hooks/useDebounce";

const AllProduct = () => {
  const [page, setPage] = useState(1);

  // UI state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // IMPORTANT: debounced search value
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 20,
    search: debouncedSearch,      // yahi bhejna hai
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });

  const onSearchChange = (e) => {
    setPage(1);
    setSearch(e.target.value);    // input instantly update hoga, koi lag nahi
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
    setSearch("");
    setCategory("");
    setPriceRange({ min: "", max: "" });
    setPage(1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="p-4">
      {/* Filter UI */}
      <div className="mb-4 flex flex-wrap items-end gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search products..."
            className="border rounded px-2 py-1 w-64"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={onCategoryChange}
            className="border rounded px-2 py-1 w-48"
          >
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        {/* Price range */}
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
          className="border px-3 py-1 rounded text-sm"
        >
          Reset
        </button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-4 gap-4">
        {data.products.map((p) => (
          <div key={p._id} className="border p-2 rounded">
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
          Page {data.page} / {data.totalPages}
        </span>

        <button
          disabled={!data.hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
