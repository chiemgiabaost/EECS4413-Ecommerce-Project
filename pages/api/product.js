import mongoose from "mongoose";
import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  
  // Ensure the database is connected
  await mongooseConnect();

  try {
    if (method === "POST") {
      const { title, description, price, images } = req.body;
      if (!title || price === undefined) {
        return res.status(400).json({ error: "Title and price are required." });
      }

      const productDoc = await Product.create({ title, description, price });
      return res.status(201).json(productDoc);
    }

    if (method === "GET") {
      const { id } = req.query; // Get the `id` from query parameters

      if (id) {
        // If `id` is provided, find the product by ID
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: "Product not found." });
        }
        return res.status(200).json(product);
      }

      // Otherwise, return all products
      const products = await Product.find();
      return res.status(200).json(products);
    }

    if (method === "PUT") {
      const { _id, title, description, price, images } = req.body;
    
      // Validate required fields
      if (!_id || !title || price === undefined) {
        return res.status(400).json({ error: "ID, title, and price are required." });
      }
    
      // Ensure price is a valid number
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: "Price must be a valid positive number." });
      }
    
      try {
        // Attempt to update the product in the database
        const productDoc = await Product.updateOne(
          { _id },
          { title, description, price, images }
        );
    
        // Check if the product was found and updated
        if (productDoc.matchedCount === 0) {
          return res.status(404).json({ error: "Product not found." });
        }
    
        // Return the updated product information
        const updatedProduct = await Product.findById(_id); // Fetch the updated product
        return res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Internal server error." });
      }
    }
    

    if (method === "DELETE") {
      const { _id } = req.body;
    
      if (!_id) {
        return res.status(400).json({ error: "ID is required." });
      }
    
      try {
        const result = await Product.deleteOne({ _id });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Product not found." });
        }
    
        return res.status(200).json({ message: "Product deleted successfully." });
      } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the product." });
      }
    }
    

    // If the method is not supported
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);

  } catch (error) {
    console.error("Database operation failed:", error);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
