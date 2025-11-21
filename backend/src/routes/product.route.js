import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, getFeaturedProducts, toggleFeaturedProduct } from "../controller/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const productRoute= express.Router()

productRoute.get('/getallProduct', protectRoute ,adminRoute, getAllProducts)
productRoute.post("/createProduct", protectRoute, adminRoute,  upload.single("image"), createProduct)
productRoute.put("/toggleFeatureProduct/:id",protectRoute, adminRoute, toggleFeaturedProduct)
productRoute.get('/getFeaturedProduct', protectRoute, adminRoute, getFeaturedProducts)
export default productRoute