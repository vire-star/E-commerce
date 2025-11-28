import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";


const paymentRoute=  express.Router()


paymentRoute.post("/success", protectRoute, createCheckoutSession)
paymentRoute.post("/check-out", protectRoute, checkoutSuccess)


export default paymentRoute