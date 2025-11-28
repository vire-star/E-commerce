import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Text index for search (name + description)
productSchema.index({ name: "text", description: "text" });

// ✅ Compound index for category + price filters
productSchema.index({ category: 1, price: 1 });

// ✅ Single index for price range queries
productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
