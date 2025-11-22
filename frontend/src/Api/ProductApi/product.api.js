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