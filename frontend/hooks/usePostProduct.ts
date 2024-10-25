// hooks/usePostProduct.ts
import { useState } from "react";
import axios from "axios";

interface ProductData {
  productName: string;
  brand: string;
  type: string;
  warrantyPeriod: string;
  startDate: string;
  description: string;
}

interface UsePostProductReturn {
  postProduct: (productData: ProductData) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const usePostProduct = (): UsePostProductReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const postProduct = async (productData: ProductData): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        JSON.stringify(productData), // Sending JSON formatted product data
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type header to application/json
          },
        }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError("Failed to add product");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return { postProduct, loading, error, success };
};

export default usePostProduct;
