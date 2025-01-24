const express = require("express");
const router = express.Router();
const Customer = require("../models/User"); // Assuming you have a Mongoose model for the User collection
const { handlegetallusers , getbyid, getbygender, getpatch, deleteUser, postuser } = require("../Controllers/user");

// Middleware 1: Log request time
router.use((req, res, next) => {
  console.log("Middleware 1 - Time:", Date.now());
  next();
});

// Middleware 2: Log request method
router.use((req, res, next) => {
  console.log("Middleware 2 - Method:", req.method);
  next();
});

// Get all users
router.get("/", handlegetallusers); // Delegated to your controller

// Get user by ID
router.get("/id/:id", getbyid);

// Get users by gender
router.get("/gender/:gender", getbygender);

// Update user by ID (PATCH)
router.patch("/id/:id", getpatch);

// Delete user by ID
router.delete("/id/:id", deleteUser);

// Create a new user
router.post("/", postuser);

module.exports = router;

