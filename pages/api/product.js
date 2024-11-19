import mongoose from "mongoose";
import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  
  // Ensure the database is connected
  await mongooseConnect();

  try {
    if (method === "POST") {
      const { title, description, price } = req.body;
      if (!title || price === undefined) {
        return res.status(400).json({ error: "Title and price are required." });
      }

      const productDoc = await Product.create({ title, description, price });
      return res.status(201).json(productDoc);
    }

    if (method === "GET") {
      const products = await Product.find();
      return res.status(200).json(products);
    }

    if (method === "PUT") {
      const { _id, title, description, price } = req.body;
      if (!_id || !title || price === undefined) {
        return res.status(400).json({ error: "ID, title, and price are required." });
      }

      const productDoc = await Product.updateOne({ _id }, { title, description, price });
      return res.status(200).json(productDoc);
    }

    if (method === "DELETE") {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ error: "ID is required." });
      }

      const productDoc = await Product.deleteOne({ _id });
      return res.status(200).json(productDoc);
    }

    // If the method is not supported
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);

  } catch (error) {
    console.error("Database operation failed:", error);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
