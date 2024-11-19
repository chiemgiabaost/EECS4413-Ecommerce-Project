import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({ product }) {
  const [formData, setFormData] = useState({
    _id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.title || !formData.description || !formData.price) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedFormData = {
      ...formData,
      price: parseFloat(formData.price), // Ensure price is a number
    };

    try {
      const response = await axios.put("/api/product", updatedFormData);
      console.log("Product updated:", response.data);
      router.push("/items"); // Redirect to the list of items after successful update
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
