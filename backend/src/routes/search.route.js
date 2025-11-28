import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { searchController } from '../controller/search.controller.js'


const searchRoute = express.Router()


searchRoute.post("/searchAI", protectRoute,searchController)

export default searchRoute