import express from "express";
import { getCartItem, getUser, login, logOut, Register } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const userRoute = express.Router()

userRoute.post('/signup', Register)
userRoute.post("/login", login)
userRoute.get("/getUser", protectRoute, getUser)
userRoute.get("/cartItem", protectRoute, getCartItem)
userRoute.post("/logout",  logOut)



export default userRoute