import axios from "axios";

export const getFeaturedProductApi = async()=>{
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/getFeaturedProduct`,
        
       
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}

export const getSingleProductApi = async(productId)=>{
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/singleProduct/${productId}`,
        
       
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}




// product.api.ts


export const getAllProductsApi = async (params) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    category = "",
    minPrice,
    maxPrice,
  } = params;

  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/product/getallProduct`,
    {
      params: {
        page,
        limit,
        search: search || undefined,
        category: category || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      },
      withCredentials: true,
    }
  );

  return res.data; // { products, page, totalPages, hasMore, ... }
};





export const PaymentApi = async (sessionId) => {
  console.log("Calling checkoutSuccess with sessionId:", sessionId);
  
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/payment/check-out`,
    { sessionId }, // ✅ sessionId backend ko bhej rahe
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return res.data;
};


// src/hooks/Product/product.hook.js (same file me)
export const createCheckoutSessionApi = async ({ products, couponCode }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/payment/success`,
    { products, couponCode }, // ✅ body me products array
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return res.data; // { id, url, totalAmount }
};


export const toggleFeatureProductApi = async(id)=>{
  const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/product/toggleFeatureProduct/${id}`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  )

  return res.data
}