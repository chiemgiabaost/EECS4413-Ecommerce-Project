import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

// Define the schema
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0, required: true },
});

// Check if 'Product' model is already defined; if not, define it
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
