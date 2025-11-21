// import Redis from "ioredis";
import jwt from 'jsonwebtoken'
import { redis } from '../lib/redis.js';
import User from '../models/user.model.js';
import { ENV } from '../lib/env.js';

const generateTokens = (userId) => {
	
	const Token = jwt.sign({ userId }, ENV.TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { Token };
};

const storeToken = async (userId, Token) => {
	await redis.set(`refresh_token:${userId}`, Token,{expiresIn:1*24*60*60*1000}); // 7days
};

const setCookies = (res,  Token) => {
	
	res.cookie("Token", Token, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		// secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};




export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });

		// authenticate
		const { Token } = generateTokens(user._id);
		await storeToken(user._id, Token);

		setCookies(res, Token);

		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		return res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { Token } = generateTokens(user._id);
			await storeToken(user._id, Token);
			setCookies(res, Token);

			
		} else {
			return res.status(400).json({ message: "Invalid email or password" });
		}


		if(user.email==ENV.ADMIN_EMAIL){
			return res.status(201).json({
				message:"Welcome back admin",
				owner:user.owner=true
			})
		}

	return 	res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				owner:user.owner
			});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.Token;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, ENV.TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


// import User from "../models/user.model.js";

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // "admin" | "customer"

    if (!["admin", "customer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.log("Error in updateUserRole", error);
    return res.status(500).json({ message: error.message });
  }
};
