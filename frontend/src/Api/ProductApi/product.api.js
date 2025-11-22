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


export const getAllProductsApi = async({ page = 1, limit = 20 })=>{
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/getallProduct`,
        {
            headers:{'Content-Type':'application/json'},
             params: { page, limit },
             withCredentials:true
        }
    )
    return res.data
    
}