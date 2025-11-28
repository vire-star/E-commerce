// hooks/Product/useProducts.ts
import { getAllProductsApi, getSingleProductApi } from "@/Api/ProductApi/product.api";
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




// export const getSingleProduct = (productId)=>{
//   return useQuery({
//     queryKey:['singleProduct', pro],
//     queryFn:()=>getSingleProductApi(productId)
//   })

// }



export const useSingleProduct = (productId) => {
  return useQuery({
    queryKey: ['singleProduct', productId], // productId add kiya for unique cache
    queryFn: () => getSingleProductApi(productId), // API function call kiya
    enabled: !!productId, // Sirf tab chalega jab productId ho (optional safety)
  })
}