const express = require("express");
const customer = require("../models/User"); // Load mock data as an array
const router = express.Router();  // coming for exporess to handle routers instead of app
const {handlegetallusers} = require("../Controllers/user")

// Middleware 1
router.use((req, res, next) => {
  console.log("Middleware 1 - Time:", Date.now());
  next();
});

// Middleware 2
router.use((req, res, next) => {
  console.log("Middleware 2 - Time:", Date.now());
  next();
});

// Get all users
router.get("/", handlegetallusers);

// Get user by ID
router.get("/id/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10); // Convert ID to a number
  const user = customer.find((customer) => customer.id === userId);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Get users by gender
router.get("/gender/:gender", (req, res) => {
  const gender = req.params.gender.toLowerCase();
  const filteredUsers = customer.filter(
    (user) => user.gender.toLowerCase() === gender
  );

  if (filteredUsers.length > 0) {
    return res.json(filteredUsers);
  } else {
    return res.status(404).json({ error: "No users found with the specified gender" });
  }
});

// Update user by ID (PATCH)
router.patch("/id/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = customer.find((customer) => customer.id === userId);

  if (user) {
    const { last_name } = req.body;
    if (last_name) user.last_name = last_name; // Update last name
    return res.json({ status: "success", updatedUser: user });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Delete user by ID
router.delete("/id/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = customer.findIndex((customer) => customer.id === userId);

  if (userIndex !== -1) {
    const deletedUser = customer.splice(userIndex, 1); // Remove user
    return res.json({ status: "success", deletedUser });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, gender, Job_title } = req.body;

    // Check if all fields are provided
    if (!first_name || !last_name || !email || !gender || !Job_title) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new user
    const result = await customer.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      Job_title: Job_title,
    });

    console.log("Result is here:", result);

    // Send success response
    return res.status(201).json({ msg: "User created successfully", data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;

