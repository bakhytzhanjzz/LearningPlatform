const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());  // This handles JSON body parsing

// Middleware for CORS
app.use(cors());

// Routes
app.use("/api/auth/", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
