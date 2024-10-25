// app/products/ProductList.js

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productDetails}>Brand: {item.brand}</Text>
      <Text style={styles.productDetails}>Type: {item.type}</Text>
      <Text style={styles.productDetails}>Warranty: {item.warranty}</Text>
      <Text style={styles.productDetails}>Start Date: {item.startDate}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Use a unique key for each item
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  productItem: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  productDetails: {
    fontSize: 14,
    color: "#7F8C8D",
  },
});

export default ProductList;
