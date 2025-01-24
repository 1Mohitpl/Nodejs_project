const customer = require("../models/User"); // Assuming you're using Mongoose

async function handlegetallusers(req, res) {
    try {
        const allEmp = await customer.find(); // Query all documents in the collection
        return res.json(allEmp); // Respond with all users
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve data" });
    }
}



async function getbyid(req, res) {
    try {
        const userId = req.params.id;
        const user = await customer.findById(userId); // Find user by MongoDB ObjectId
        if (user) {
          return res.json(user);
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    
}



async function getbygender(req, res) {
    try {
        const gender = req.params.gender.toLowerCase();
        const filteredUsers = await customer.find({
          gender: { $regex: new RegExp(`^${gender}$`, "i") }, // Case-insensitive search
        });
    
        if (filteredUsers.length > 0) {
          return res.json(filteredUsers);
        } else {
          return res.status(404).json({ error: "No users found with the specified gender" });
        }
      } catch (error) {
        console.error("Error fetching users by gender:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    
}

async function getpatch(req, res) {
  try {
    const userId = req.params.id;
    const { last_name } = req.body;
    if (!last_name) {
      return res.status(400).json({ error: "Last name is required for update" });
    }

    const updatedUser = await customer.findByIdAndUpdate(
      userId,
      { last_name },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      return res.json({ status: "success", updatedUser });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  
}



async function deleteUser(params) {
  try {
    const userId = req.params.id;
    const deletedUser = await customer.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.json({ status: "success", deletedUser });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function postuser(params) {
  try {
    const { first_name, last_name, email, gender, Job_title } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !gender || !Job_title) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new user
    const newUser = new customer({
      first_name,
      last_name,
      email,
      gender,
      Job_title,
    });

    const result = await newUser.save(); // Save to MongoDB

    return res.status(201).json({ msg: "User created successfully", data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { handlegetallusers, getbyid , getbygender, getpatch, deleteUser, postuser};


