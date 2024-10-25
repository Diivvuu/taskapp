// server.js

const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// Middleware
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.use("/api", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
