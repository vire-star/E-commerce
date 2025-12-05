import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, singleProduct, toggleFeaturedProduct } from "../controller/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const productRoute= express.Router()

productRoute.get('/getallProduct', protectRoute , getAllProducts)
productRoute.post("/createProduct", protectRoute, adminRoute,  upload.single("image"), createProduct)
productRoute.put("/toggleFeatureProduct/:id",protectRoute, adminRoute, toggleFeaturedProduct)
productRoute.get('/getFeaturedProduct', protectRoute, adminRoute, getFeaturedProducts)
productRoute.delete('/deleteProduct/:id',  protectRoute, adminRoute, deleteProduct)
productRoute.get('/getRecomendedProduct', protectRoute, getRecommendedProducts)
productRoute.get('/getProductByCateogry/:id', protectRoute, getProductsByCategory)
productRoute.get('/toggleFeatureProduct/:id',adminRoute, protectRoute, toggleFeaturedProduct)
productRoute.get('/singleProduct/:id', protectRoute, singleProduct)
export default productRoute