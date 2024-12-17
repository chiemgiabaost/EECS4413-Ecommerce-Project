import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  // Ensure the database connection
  try {
    await mongooseConnect();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Database connection error", details: error.message });
  }

  // Handle POST request
  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      const categoryDoc = await Category.create({
        name,
        parent: parentCategory || undefined,
        properties: properties || [],
      });
      res.json(categoryDoc);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create category", details: error.message });
    }
  }

  // Handle GET request
  if (method === "GET") {
    try {
      const categories = await Category.find().populate("parent"); // Populate 'parent' field
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch categories", details: error.message });
    }
  }

  // Handle PUT request
  if (method === "PUT") {
    const { _id, name, parentCategory, properties } = req.body;

    if (!_id || !name) {
      return res.status(400).json({ error: "ID and name are required" });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        {_id},
        {
          name,
          parent: parentCategory || undefined,
          properties: properties || [],
        },
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(updatedCategory);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update category", details: error.message });
    }
  }

  // Handle DELETE request
  if (method === "DELETE") {
    const { _id } = req.query;

    if (!_id) {
      return res.status(400).json({ error: "ID is required for deletion" });
    }

    try {
      const deletedCategory = await Category.findByIdAndDelete(_id);
      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete category", details: error.message });
    }
  }
}
