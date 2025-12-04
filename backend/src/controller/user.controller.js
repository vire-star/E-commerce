import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
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
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true,  secure: true, sameSite: "none" }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
	} catch (error) {
		console.log(`error from Register, ${error}`)
	}
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Please enter all the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Please check your credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Please check your credentials",
      });
    }

    const token = await jwt.sign(
      { userId: user._id },
      ENV.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Admin bhi hai to bhi cookie set karo
    const isAdmin = user.email === ENV.ADMIN_EMAIL;

    res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
  sameSite: "none", 
      })
      .status(200)
      .json({
        message: isAdmin ? "Welcome Back Admin" : `Welcome back ${user.name}`,
        user,
        isAdmin,
        success: true,
      });
  } catch (error) {
    console.log(`error from login backend ${error}`);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};




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


export const getCartItem = async(req,res)=>{
  try {
    const userId = req.user;

    const user = await User.findById(userId).populate("cartItems.product")

    if(!user){
      return res.status(401).json({
        message:"User not found"
      })
    }

    

     const cartItems = user.cartItems.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      image: item.product.image,
      category: item.product.category,
      quantity: item.quantity,
    }));

    return res.status(201).json(cartItems)
  } catch (error) {
    console.log(error)
  }
}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name } = req.body;
        
        const updateData = {};
        
        if (name) {
            updateData.name = name;
        }
        
        // Safe file check
        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            
            const uploadRes = await cloudinary.uploader.upload(base64, {
                folder: "profilePhoto",
            });
            
            updateData.profilePhoto = uploadRes.secure_url;
        }
        
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
        
    } catch (error) {
        console.error('Update Profile Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
