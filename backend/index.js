import express from "express";
import { ENV } from "./src/lib/env.js";
import { connectDb } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import productRoute from "./src/routes/product.route.js";
import cartRouter from "./src/routes/cart.route.js";


const app  = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    return res.status(201).json({message:"hi"})
})
app.get("/health", (req, res) => {
  res.json({ ok: true });
});
app.use('/api',userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart',cartRouter)
app.listen(ENV.PORT,()=>{
    connectDb()
    console.log(`server started ${ENV.PORT}`)
})