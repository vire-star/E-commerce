import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;

		const existingItem = user.cartItems.find((item) => item.id === productId);
		if (existingItem) {
			return res.status(201).json({
                message:"Product is already in the cart"
            })
		} else {
			user.cartItems.push(productId);
		}

		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};



export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: req.user.cartItems } });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};



export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;
		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) => item.id !== productId);
		}
		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;  
    const { operation } = req.body;        // "increase" or "decrease"
    const user = req.user;

    const item = user.cartItems.find((p) => p.id === productId);

    // Agar product user cart me exist hi nahi karta
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Increase quantity
    if (operation === "increase") {
      item.quantity += 1;
    }

    // Decrease quantity
    else if (operation === "decrease") {
      item.quantity -= 1;

      // Agar quantity 0 ho jaye → remove from cart
      if (item.quantity <= 0) {
        user.cartItems = user.cartItems.filter((p) => p.id !== productId);
       
      }
    }

    else {
      return res.status(400).json({ message: "Invalid operation" });
    }

    await user.save();
    return res.json(user.cartItems);

  } catch (error) {
    console.log("Error in updateProductQuantity controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
