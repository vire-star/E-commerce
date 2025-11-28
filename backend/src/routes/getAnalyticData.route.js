import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsController, getDailySalesController } from "../controller/analytic.controller.js";


const analyticDataRoute = express.Router()


analyticDataRoute.get('/getData', protectRoute, getAnalyticsController)
analyticDataRoute.get('/dailySales', protectRoute, getDailySalesController)

export default analyticDataRoute