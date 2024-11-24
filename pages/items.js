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
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-4 py-2 text-left">#</th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Product Name
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Price
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {product.title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {product.description || "No description"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border border-gray-400 px-4 py-2 flex items-center justify-center space-x-2">
                  <Link
                    href={`/items/${product._id}`}
                    className="bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-green-600 transition"
                  >
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
