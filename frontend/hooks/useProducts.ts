// app/productService.ts

import { Product } from "@/app/types"; // Import your Product type

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Make sure your backend server is running at this URL
    const response = await fetch("http://localhost:5000/api/products");

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data: Product[] = await response.json(); // Parse JSON response
    console.log(data, "nice");
    return data; // Return fetched product data
  } catch (error) {
    console.error(error); // Log any errors encountered during fetch
    return []; // Return an empty array in case of error
  }
};
