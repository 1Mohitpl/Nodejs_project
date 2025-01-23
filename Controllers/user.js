const customer = require("../models/User"); // Assuming you're using Mongoose

async function handlegetallusers(req, res) {
    try {
        const allEmp = await customer.find(); // Query all documents in the collection
        return res.json(allEmp); // Respond with all users
    } catch (error) {
        res.status(500).json({ error: "Unable to retrieve data" });
    }
}

module.exports = { handlegetallusers };
