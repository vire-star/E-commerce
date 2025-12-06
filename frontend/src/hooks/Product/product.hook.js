// hooks/Product/useProducts.ts
import { createCheckoutSessionApi, deleteSingleProductApi, getAllProductsApi, getSingleProductApi, PaymentApi, toggleFeatureProductApi } from "@/Api/ProductApi/product.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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




export const useDeleteProductFromDB=()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:deleteSingleProductApi,
    onSuccess:(data)=>{
      queryClient.invalidateQueries(['productsf'])
      toast.success("product deleted")
      console.log(data)
    }
  })
}


export const useSingleProduct = (productId) => {
  return useQuery({
    queryKey: ['singleProduct', productId], // productId add kiya for unique cache
    queryFn: () => getSingleProductApi(productId), // API function call kiya
    enabled: !!productId, // Sirf tab chalega jab productId ho (optional safety)
  })
}


// src/hooks/usePayment.js
export const usePaymentHook = () => {
  return useMutation({
    mutationFn: (sessionId) => PaymentApi(sessionId),
    onSuccess: (data) => {
      console.log("Order created:", data);
      toast.success("Order created successfully!");
    },
    onError: (err) => {
      console.error("Payment error:", err);
      
      // ✅ Agar duplicate error ho to success dikhao (kyunki order pehle se hai)
      const errorMsg = err?.response?.data?.error || "";
      
      if (errorMsg.includes("duplicate key") || errorMsg.includes("already")) {
        toast.success("Order already created!");
      } else {
        toast.error(err?.response?.data?.message || "Payment verification failed");
      }
    },
  });
};


export const useCheckoutHook = () => {
  return useMutation({
    mutationFn: createCheckoutSessionApi,
    onSuccess: (data) => {
      // window.location.href = data.url;  // REDIRECT TO STRIPE
      console.log(data)
       window.location.href = data.url; 
    },
    onError: (err) => {
      // toast.error(err?.response?.data?.message || "Checkout failed");
      console.log(err)
    },
  });
}

export const useToggleProduct = ()=>{
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn:toggleFeatureProductApi,
    onSuccess:(data)=>{
      console.log(data)
      toast.success("Product toggled successfully")
       queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["GetFeaturedProduct"]);
    },
    onError:(err)=>{
      console.log(err)
    }
  })
}