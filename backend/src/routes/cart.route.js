import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToCart, getCartProducts, removeAllFromCart, updateProductQuantity } from "../controller/cart.controller.js";
import { deleteProduct } from "../controller/product.controller.js";


const cartRouter = express.Router()


cartRouter.post("/addToCart", protectRoute, addToCart )
cartRouter.get("/getCartProduct", protectRoute, getCartProducts )
cartRouter.post("/update/:id", protectRoute, updateProductQuantity)
cartRouter.post("/deleteProduct", protectRoute, removeAllFromCart)

export default cartRouter