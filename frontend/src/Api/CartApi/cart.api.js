import axios from "axios";

export const addToCartApi = async (payload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/cart/addToCart`,
    payload,

    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return res.data;
};


// src/Api/CartApi/cart.api.js
export const updateCartQuantityApi = async ({ productId, operation }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/cart/update/${productId}`,
    { operation }, // ✅ "increase" or "decrease"
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return res.data;
};
