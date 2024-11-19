import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";

export default function NewItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert("Title and price are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/product", {
        title,
        description,
        price: parseFloat(price),
      });

      if (response.status === 201) {
        alert("Product added successfully!");
        router.push("/items");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      alert(`Failed to add product: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Description</label>
          <textarea
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Price (USD)</label>
          <input
            type="number"
            placeholder="Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-black to-blue-900 text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </Layout>
  );
}
