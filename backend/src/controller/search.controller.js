import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";
import Product from "../models/product.model.js";

export const searchController = async(req ,res)=>{
    const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    try {
        const {input} = req.body;
        if(!input){
            return res.status(401).json({
                message:"Please provide input"
            })
        }


        const prompt = `You are an intelligent assistant for an E-commerce platform. A user will type any query about what they want. Your task is to understand the intent and return most relevant keyword from the following list of categories:
- Jeans
- Pants
- Shirts
- Kids
- Mens
- Womens

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text. Query: "${input}"`;


         const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text().trim();
        // const product = await Product.find({
        //     isFeatured:true,
        //     $or:[
        //         {name:{$regex:input, options:'i'}},
        //         {description:{$regex:input, options:'i'}},
        //         {price:{$regex:input, options:'i'}},
                
        //     ]
        // })

        return res.status(201).json(text)


    } catch (error) {
        console.log(`error from search controller ${error}`)
    }
}