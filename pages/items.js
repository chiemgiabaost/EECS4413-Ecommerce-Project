import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/product"); // Correct API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          className="bg-gradient-to-r from-black to-blue-900 rounded-lg px-4 py-2 text-white"
          href="/items/new"
        >
          Add New Product
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <table className="basic">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.description || "No description"}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className="text-center">
                  <Link href={`/items/${product._id}`} className="btn-default">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No products available. Add one!</p>
      )}
    </Layout>
  );
}
