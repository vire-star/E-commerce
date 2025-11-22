import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
export const Register =async(req , res)=>{
	try {
		
		const {name, email, password}= req.body;

		if(!name || !email || !password){
			return res.status(401).json({
				message:"All Fields are required"
			})
		}

		const user = await User.findOne({email})
		if(user){
			return res.status(401).json({
				message:"User already exist, try another email"
			})
		}


		const newUser = await User.create({
			name,
			email,
			password
		})

		 const token = await jwt.sign({userId : newUser._id},ENV.TOKEN_SECRET)
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
	} catch (error) {
		console.log(`error from Register, ${error}`)
	}
}



export const login =async(req,res)=>{
	try {
		const {email, password} = req.body;
		if(!email || !password){
			return res.status(401).json({
				message:"Please enter all the details"
			})
		}

		const user =await User.findOne({email})

		if(!user){
			return res.status(201).json({
				message:"Please check your credentials"
			})
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password)

		if(!isPasswordMatch){
			return res.status(401).json({
				message:"Please check you credentials"
			})
		}

		const token = await jwt.sign({userId : user._id},ENV.TOKEN_SECRET)

		if(user.email===ENV.ADMIN_EMAIL){
			return res.status(201).json({
				message:"Welcome Back Admin"
			})
		}

		 res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })

         res.status(200).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
		
	} catch (error) {
		console.log(`error from login backend ${error}`)
	}
}



export const getUser = async (req, res) => {
  try {
    // req.user already full user object hai
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(`error from getUser, ${error}`);
    return res.status(500).json({ message: "Server error" });
  }
};



export const logOut = async (req, res) => {
 try {
	        return res.clearCookie("token", {
    httpOnly: true,
    secure: true,        // agar HTTPS hai (Render/Vercel to hamesha hota hai)
    sameSite: "none",    // cross-site requests ke liye zaroori
  }).status(201).json({
	message:"LOgged out"
  });

  
 } catch (error) {
	console.log(`error from logout, ${error}`)
 }
};
