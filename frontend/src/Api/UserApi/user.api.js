import axios from 'axios'

export const registerApi = async(payload)=>{
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        payload,
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}
export const loginApi = async(payload)=>{
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        payload,
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}
export const updatApi = async(payload)=>{
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/updateProfile`,
        payload,
        {
             headers:{'Content-Type': 'multipart/form-data'},
            withCredentials:true
        }
    );
    return res.data
}
export const getUserApi = async()=>{
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getUser`,
       
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}

export const logoutApi = async()=>{
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
       
        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    );
    return res.data
}



export const getCartItemApi = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cartItem`,
        {
           headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data
}