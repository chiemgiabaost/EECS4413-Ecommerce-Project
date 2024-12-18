import mongoose, { model, models } from "mongoose";
import clientPromise from "@/lib/mongodb";

// Define the schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
});

export const Category = models?.Category || model("Category", CategorySchema);
