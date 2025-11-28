import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controller/payment.controller.js";


const paymentRoute=  express.Router()


paymentRoute.post("/success", protectRoute, createCheckoutSession)


export default paymentRoute