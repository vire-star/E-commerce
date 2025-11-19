import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDb = async()=>{
    try {
        await mongoose.connect(ENV.DB_URL)
        console.log(`DB connected`)
    } catch (error) {
        console.log(`error from connectDb, ${error}`)
    }
}