import axios from "axios"

export const DashboardApi = async()=>{
    const res =await axios.get(`${import.meta.env.VITE_BASE_URL}/analytic/getData`,

        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data

}

