
import { addToCartApi, updateCartQuantityApi } from '@/Api/CartApi/cart.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner';
export const useAddToCartMutation=()=>{
    const queryClient = useQueryClient();
   return useMutation({
    mutationFn:addToCartApi,
    onSuccess:(data)=>{
        queryClient.invalidateQueries(['getUser'])
        console.log(data)
        toast.success(data?.message)
    },

    onError:(err)=>{
          console.log("addToCart error:", err.response?.data || err.message)
    }
   })
}


export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartQuantityApi,
    onSuccess: (data) => {
      console.log("Quantity updated:", data);
      queryClient.invalidateQueries(["CartItem"]);
      toast.success("Cart updated");
    },
    onError: (err) => {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update");
    },
  });
};