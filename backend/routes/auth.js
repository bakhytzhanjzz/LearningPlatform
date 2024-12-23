// In routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to DB
        await user.save();
        res.status(200).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Send a success message (JWT token will be added here in the future)
        res.status(200).json({ msg: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
})

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update user by ID
router.put("/users/:id", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
