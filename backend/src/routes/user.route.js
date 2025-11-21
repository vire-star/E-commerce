import express from "express";
import { getProfile, login, logout, signup, updateUserRole } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const userRoute = express.Router()

userRoute.post('/signup', signup)
userRoute.post('/login', login)
userRoute.post('/logout', logout)
userRoute.get('/getUser', protectRoute, getProfile)
userRoute.put('/updateRole/:id', protectRoute, updateUserRole)


export default userRoute