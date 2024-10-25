import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Picker,
} from "react-native";
import { Maximize, Minimize } from "lucide-react";
import usePostProduct from "@/hooks/usePostProduct";

const ProductForm: React.FC = () => {
  const { postProduct, loading, error, success } = usePostProduct();
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    type: "",
    warranty: "",
    startDate: "",
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      productName: "",
      brand: "",
      type: "",
      warranty: "",
      startDate: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.productName)
      newErrors.productName = "Product name is required.";
    if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.type) newErrors.type = "Please select a product type.";
    if (formData.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.startDate)) {
      newErrors.startDate = "Start Date must be in YYYY-MM-DD format.";
    }
    if (formData.warranty && isNaN(Number(formData.warranty))) {
      newErrors.warranty = "Warranty Period must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<void> => {
    if (validateForm()) {
      const result = await postProduct({
        ...formData,
        warrantyPeriod: formData.warranty,
      });
      if (result) {
        setSubmitted(true);
        Alert.alert("Success", "Product added successfully!");
        resetForm();
      } else if (error) {
        Alert.alert("Error", error);
      }
    }
  };

  return (
    <View style={[styles.container, isMinimized && styles.minimized]}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? <Maximize size={15} /> : <Minimize size={15} />}
      </TouchableOpacity>

      {submitted ? (
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedText}>
            Product Submitted Successfully!
          </Text>
          <TouchableOpacity style={styles.newProductButton} onPress={resetForm}>
            <Text style={styles.newProductButtonText}>Add New Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        !isMinimized && (
          <>
            <Text style={styles.header}>Add New Product</Text>
            <TextInput
              style={[styles.input, errors.productName && styles.errorInput]}
              value={formData.productName}
              onChangeText={(text) => handleChange("productName", text)}
              placeholder="Product Name"
            />
            {errors.productName && (
              <Text style={styles.errorText}>{errors.productName}</Text>
            )}

            <TextInput
              style={[styles.input, errors.brand && styles.errorInput]}
              value={formData.brand}
              onChangeText={(text) => handleChange("brand", text)}
              placeholder="Brand"
            />
            {errors.brand && (
              <Text style={styles.errorText}>{errors.brand}</Text>
            )}

            <Text style={styles.label}>Type</Text>
            <Picker
              selectedValue={formData.type}
              style={[styles.picker, errors.type && styles.errorInput]}
              onValueChange={(itemValue) => handleChange("type", itemValue)}
            >
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Furniture" value="Furniture" />
              <Picker.Item label="Appliance" value="Appliance" />
              <Picker.Item label="Tool" value="Tool" />
            </Picker>
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

            <TextInput
              style={[styles.input, errors.warranty && styles.errorInput]}
              value={formData.warranty}
              onChangeText={(text) => handleChange("warranty", text)}
              placeholder="Warranty Period (months)"
              keyboardType="numeric"
            />
            {errors.warranty && (
              <Text style={styles.errorText}>{errors.warranty}</Text>
            )}

            <TextInput
              style={[styles.input, errors.startDate && styles.errorInput]}
              value={formData.startDate}
              onChangeText={(text) => handleChange("startDate", text)}
              placeholder="Start Date (YYYY-MM-DD)"
            />
            {errors.startDate && (
              <Text style={styles.errorText}>{errors.startDate}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={submitForm}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Saving..." : "Confirm"}
              </Text>
            </TouchableOpacity>
            {success && (
              <View style={styles.successMessageContainer}>
                <Text style={styles.successMessageText}>
                  Product successfully added!
                </Text>
              </View>
            )}
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  successMessageContainer: {
    backgroundColor: "#D4EDDA", // Light green background
    borderColor: "#C3E6CB", // Darker green border
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },

  successMessageText: {
    color: "#155724", // Dark green text
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  minimized: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  toggleButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 10,
    position: "absolute",
    top: 2,
    right: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#333",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#F7F7F7",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#D8000C",
    fontSize: 12,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "#D8000C",
    backgroundColor: "#FDEDEC",
  },
});

export default ProductForm;
