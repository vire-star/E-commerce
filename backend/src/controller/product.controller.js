import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { redis } from "../lib/redis.js";
// import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const getAllProducts = async (req, res) => {
  try {
    // Pagination variables
    const page = parseInt(req.query.page ?? "1", 10);
    const limit = parseInt(req.query.limit ?? "20", 10);
    const skip = (page - 1) * limit;

    // Filters from query
    const { search, category, minPrice, maxPrice } = req.query;

    // AI prompt
    const prompt = `You are an intelligent assistant for an E-commerce platform. A user will type any query about what they want. Your task is to understand the intent and return most relevant keyword from the following list of categories:
- Jeans
- Pants
- Shirt
- Jacket
- Saree
- Shoes

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text. Query: "${search}"`;

    // Variables for processed filters
    let aiText = null;

    if (search && search.trim() !== "") {
      const result = await model.generateContent(prompt);
      aiText =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.trim()
          .replace(/[`"\n]/g, "") || "";
    }

   
    let aiCategory = category;

    // MongoDB query construction
    const mongoQuery = {};

    if (aiText) {
      mongoQuery.$or = [
        { name: { $regex: aiText, $options: "i" } },
        { description: { $regex: aiText, $options: "i" } },
        // { description: { $regex: aiText, $options: "i" } },
      ];
    }

    
    if (aiCategory) {
      mongoQuery.category = aiCategory;
    }

    if (minPrice || maxPrice) {
      mongoQuery.price = {};
      if (minPrice) mongoQuery.price.$gte = Number(minPrice);
      if (maxPrice) mongoQuery.price.$lte = Number(maxPrice);
    }

    // Cache key based on filters and pagination
    const cacheKey = `products:${JSON.stringify({
      page,
      limit,
      search: aiText ?? "",
      category: aiCategory ?? "",
      minPrice: minPrice ?? "",
      maxPrice: maxPrice ?? "",
    })}`;

    // Check cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      const data = typeof cached === "string" ? JSON.parse(cached) : cached;
      return res.status(200).json({ fromCache: true, ...data });
    }

    // Fetch from DB with pagination
    const [items, total] = await Promise.all([
      Product.find(mongoQuery).skip(skip).limit(limit).lean(),
      Product.countDocuments(mongoQuery),
    ]);

    // Return 200 with empty result if no items found (better UX)
    if (!items || items.length === 0) {
      const emptyPayload = {
        products: [],
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasMore: false,
        appliedFilters: {
          search: aiText,
          category: aiCategory,
          minPrice,
          maxPrice,
        },
      };
      await redis.set(cacheKey, JSON.stringify(emptyPayload));
      return res.status(200).json({ fromCache: false, ...emptyPayload });
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    // Assemble payload
    const payload = {
      products: items,
      page,
      limit,
      total,
      totalPages,
      hasMore,
      appliedFilters: {
        search: aiText,
        category: aiCategory,
        minPrice,
        maxPrice,
      },
    };

    // Cache result for future requests
    await redis.set(cacheKey, JSON.stringify(payload), { ex: 600 });

    // Return success response
    return res.status(200).json({ fromCache: false, ...payload });
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

    // 2) DB se lao
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // 3) Redis me direct object/array store karo
    // await redis.set("featured_products", featuredProducts);

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
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

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
    const keys = await redis.keys("products:*");
    if (keys.length > 0) {
      await redis.del(...keys); // ❌ Pehle: redis.del(keys)
    }
    return res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId);

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
    const keys = await redis.keys("products:*");
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    


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
      await product.save();

      const keys = await redis.keys("products:*");
      if (keys.length > 0) {
        await redis.del(...keys);
      }

      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(401).json({
        message: "Please provide id",
      });
    }

    const product = await Product.findById(productId);

    return res.status(201).json(product);
  } catch (error) {
    console.log(`error from single Product`);
  }
};
