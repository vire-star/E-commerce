import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
// import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
  try {
    // 1) Cache check
    const cached = await redis.get("allProducts");

    console.log("cached type =", typeof cached);
    console.log("cached raw  =", cached);

    if (cached) {
      // Agar Upstash ne already object return kiya (auto-deserialize), to parse ki zarurat nahi
      if (typeof cached === "object") {
        return res.status(200).json({ fromCache: true, products: cached });
      }

      // Agar string hai, tabhi JSON.parse karo
      if (typeof cached === "string") {
        const products = JSON.parse(cached);
        return res.status(200).json({ fromCache: true, products });
      }
    }

    // 2) DB se lao
    const products = await Product.find({}).lean();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // 3) Redis me seedha object store karo (Upstash khud stringify karega)
    await redis.set("allProducts", products);

    return res.status(200).json({ fromCache: false, products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};



export const getFeaturedProducts = async (req, res) => {
  try {
    // 1) Cache check
    const cached = await redis.get("featured_products");

    // console.log("featured cached =", cached, "type =", typeof cached);

    if (cached) {
      // Upstash usually deserializes automatically to array/object
      return res.status(200).json({ fromCache: true, products: cached });
    }

    // 2) DB se lao
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts || featuredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No featured products found" });
    }

    // 3) Redis me direct object/array store karo
    await redis.set("featured_products", featuredProducts);

    return res
      .status(200)
      .json({ fromCache: false, products: featuredProducts });
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      // buffer ko base64 me convert karke Cloudinary ko de dete hain
      const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "products",
      });

      imageUrl = uploadRes.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });
     await redis.del("allProducts");
    return res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}