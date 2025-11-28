import { configDotenv } from "dotenv";

configDotenv({quiet:"true"})

// console.log("Raw UPSTASH_REDIS_REST_URL =", process.env.UPSTASH_REDIS_REST_URL);

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  CLOUD_NAME:process.env.CLOUD_NAME,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  ADMIN_EMAIL:process.env.ADMIN_EMAIL,
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY,
  GEMINI_API_KEY:process.env.GEMINI_API_KEY,
  CLIENT_URL:process.env.CLIENT_URL

};
