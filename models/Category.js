import mongoose, {model, models} from "mongoose";
import clientPromise from "@/lib/mongodb";

// Define the schema
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

export const Category = models?.Category || model("Category", CategorySchema);