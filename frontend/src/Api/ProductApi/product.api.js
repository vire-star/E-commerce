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
