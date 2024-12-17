import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // Ensure id is available before making the API call
    console.log("Fetching product data for ID:", id);
    axios.get(`/api/product?id=${id}`).then(response => {
      setProductInfo(response.data);
      console.log("Product data fetched:", response.data);
    }).catch(error => {
      console.error("Error fetching product data:", error);
    });
  }, [id]); // Depend on `id` to refetch when it changes

  if (!id) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {productInfo ? (
        <Layout>
      <h1>Edit product</h1>
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
    </Layout>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
}
