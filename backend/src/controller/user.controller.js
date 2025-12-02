import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import Product from "../models/product.model.js";
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
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None' }).json({
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
       sameSite: 'None'  // localhost pe strict/lax chalega
        // secure: false       // HTTPS nahi hai to mat lagao
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


// export const getCartItem = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate("cartItems.product");

//     const cartItems = user.cartItems.map((item) => {
//       if (!item.product) {
//         return {
//           _id: null,
//           name: "Product removed",
//           price: 0,
//           quantity: item.quantity,
//         };
//       }

//       return {
//         ...item.product.toObject(),
//         quantity: item.quantity
//       };
//     });

//     res.json(cartItems);
//   } catch (error) {
//     console.log("Error in getCartItem:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// export const getCartItem = async (req, res) => {
//   try {
//     const cartItems = req.user.cartItems; // [{ product: ObjectId, quantity }]

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(200).json([]);
//     }

//     // ✅ Step 1: Sirf product IDs nikalo
//     const productIds = cartItems.map((item) => item.product);

//     // ✅ Step 2: Un IDs se products fetch karo
//     const products = await Product.find({ _id: { $in: productIds } }).lean();

//     // ✅ Step 3: Har product ke saath quantity merge karo
//     const result = products.map((product) => {
//       const item = cartItems.find(
//         (cartItem) => String(cartItem.product) === String(product._id)
//       );
//       return {
//         ...product,
//         quantity: item?.quantity || 1,
//       };
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     console.log("Error in getCartItem:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// export const getCartItem = async (req, res) => {
//   try {
//     const cartItems = req.user.cartItems;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(200).json([]);
//     }

//     // Step 1: Unique product IDs nikalo
//     const productIds = [...new Set(cartItems.map((item) => String(item.product)))];

//     console.log("Unique productIds >>>", productIds);

//     // Step 2: Products fetch karo
//     const products = await Product.find({ 
//       _id: { $in: productIds } 
//     }).lean();

//     // Step 3: Duplicate products ki quantity add karo
//     const result = products.map((product) => {
//       // Same product ke saare cart items nikalo
//       const matchingItems = cartItems.filter(
//         (item) => String(item.product) === String(product._id)
//       );

//       // Unki quantity sum karo
//       const totalQuantity = matchingItems.reduce(
//         (sum, item) => sum + item.quantity, 
//         0
//       );

//       return {
//         ...product,
//         quantity: totalQuantity, // 1 + 1 = 2
//       };
//     });

//     console.log("Result with merged quantity >>>", result);

//     return res.status(200).json(result);
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

