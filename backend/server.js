const express = require("express");
const cors = require("cors");
const path = require("path");
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

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
    });
  } else {
    // For development, you can run React frontend separately
    app.get("/", (req, res) => {
      res.send("Backend is running!");
    });
  }

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
