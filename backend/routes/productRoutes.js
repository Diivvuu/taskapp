// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../db"); // Import your database connection

// POST: Add a new product
router.post("/products", (req, res) => {
  const { productName, brand, type, warrantyPeriod, startDate, description } =
    req.body;

  const sql = `INSERT INTO products (productName, brand, type, warrantyPeriod, startDate, description)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [productName, brand, type, warrantyPeriod, startDate, description],
    (err, result) => {
      if (err) {
        console.error("Error adding product:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ id: result.insertId, message: "Product added successfully" });
    }
  );
});

// GET: Retrieve all products
router.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
