import Coupon from "../models/coupon.model.js";
// import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import { ENV } from "../lib/env.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${ENV.CLIENT_URL}/purchase-cancel`,
			
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
				products.map((item) => ({
                        id: item.product._id, // ✅ Nested access
                        quantity: Number(item.quantity) || 1,
                        price: item.product.price,
                    }))
				),
			},
		});

		
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 , url:session.url});
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

// backend/controller/payment.controller.js

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    // ✅ YAHAN ADD KARO - Pehle check karo order exist karta hai kya
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

    if (existingOrder) {
     
      return res.status(200).json({
        success: true,
        message: "Order already created",
        orderId: existingOrder._id,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }

      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      await User.findByIdAndUpdate(session.metadata.userId, {
        $set: { cartItems: [] },
      });

      return res.status(200).json({
        success: true,
        message: "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment not completed",
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    return res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};




