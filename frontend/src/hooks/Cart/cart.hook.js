
import { addToCartApi } from '@/Api/CartApi/cart.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner';
export const useAddToCartMutation=()=>{
    const queryClient = useQueryClient();
   return useMutation({
    mutationFn:addToCartApi,
    onSuccess:(data)=>{
        queryClient.invalidateQueries(['getUser'])
        // console.log(data)
        toast.success(data?.message)
    },

    onError:(err)=>{
          console.log("addToCart error:", err.response?.data || err.message)
    }
   })
}