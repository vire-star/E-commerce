import { configDotenv } from "dotenv";

configDotenv({quiet:"true"})

// console.log("Raw UPSTASH_REDIS_REST_URL =", process.env.UPSTASH_REDIS_REST_URL);

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  TOKEN_SECRET: process.env.TOKEN_SECRET
};
