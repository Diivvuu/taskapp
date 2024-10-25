// app/_layout.tsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ProductForm from "./products/ProductForm";
import ProductList from "./products/ProductList";
import { Product } from "./types";
import { fetchProducts } from "@/hooks/useProducts"; // Import your fetch function

const Layout = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      console.log(data, "fetched products"); // Log the fetched data instead
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <ProductForm />
      <ProductList products={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5", // Lighter background
  },
});

export default Layout;
