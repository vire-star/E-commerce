// hooks/Product/useProducts.ts
import { getAllProductsApi } from "@/Api/ProductApi/product.api";
import { useQuery } from "@tanstack/react-query";
// import { getAllProductsApi } from "@/Api/ProductApi/product.api";

export const useProducts = (options) => {
  const { page, limit, search, category, minPrice, maxPrice } = options;

  return useQuery({
    queryKey: ["products", { page, limit, search, category, minPrice, maxPrice }],
    queryFn: () =>
      getAllProductsApi({ page, limit, search, category, minPrice, maxPrice }),
    keepPreviousData: true, // page change par purana data flash nahi hoga
  });
};



// import { useQuery } from "@tanstack/react-query";
// import { getAllProductsApi } from "@/Api/ProductApi/product.api";

// export const useProducts = (page, limit = 20) => {
//   return useQuery({
//     queryKey: ["products", page, limit],
//     queryFn: () => getAllProductsApi({ page, limit }),
//     keepPreviousData: true, // page change pe purana flash nahi hoga
//   });
// };
