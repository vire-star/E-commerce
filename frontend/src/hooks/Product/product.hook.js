import { useQuery } from "@tanstack/react-query";
import { getAllProductsApi } from "@/Api/ProductApi/product.api";

export const useProducts = (page, limit = 20) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getAllProductsApi({ page, limit }),
    keepPreviousData: true, // page change pe purana flash nahi hoga
  });
};
