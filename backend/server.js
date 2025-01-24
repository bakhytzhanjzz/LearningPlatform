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

// Middleware
app.use(express.json());
app.use(cors());

// API Routes - make sure this comes BEFORE the static file serving
app.use("/api/auth", authRoutes);  // Remove trailing slash

app.get('/about', (req, res) => {
    console.log('About page route hit'); // Для проверки что маршрут работает
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
} 

// This should be the last route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});