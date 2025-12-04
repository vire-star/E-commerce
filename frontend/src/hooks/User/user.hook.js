import { getCartItemApi, loginApi, logoutApi, registerApi, updatApi } from "@/Api/UserApi/user.api"
import { useUserStore } from "@/Store/Store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useLoginMutation = ()=>{
    const navigate= useNavigate()
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
            // console.log(data)
            toast.success(data?.message)
            navigate("/")
        },

        onError:(err)=>{
            toast.error(err?.response?.data?.message)
        }
    })
}
export const useUpdateMutation = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:updatApi,
        onSuccess:(data)=>{
            // console.log(data)
            queryClient.invalidateQueries(['getUser'])
            toast.success(data?.message)
           
        },

        onError:(err)=>{
            toast.error(err?.response?.data?.message)
        }
    })
}
export const useRegisterMutation = ()=>{
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            console.log(data)
            toast.success(data?.message)
        },

        onError:(err)=>{
            toast.error(err?.response?.data?.message)
        }
    })
}


import {  useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useUserStore } from "@/Store/Store";
// import { logoutApi } from "@/Api/UserApi/user.api";

export const useLogoutMutation = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      clearUser();                                  // Zustand clean
      queryClient.removeQueries(['getUser']);       // React Query cache + observers hatao
      toast.success(data?.message);
      navigate('/login');                           // optional
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};



export const useUserCartItem =()=>{
  return useQuery({
    queryKey:['CartItem'],
    queryFn:getCartItemApi
  })
}