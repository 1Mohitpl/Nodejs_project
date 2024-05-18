const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");



const app = express();
const PORT = 7000;

app.use(express.urlencoded({ extended: false })); // middleware - Plugin

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.route("/api/users/:gender/:id");

// get the users accridng to thier id
app.get("/api/users/id/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});



// for get the user accoring to their gender
app.get("/api/users/gender/:gender", (req, res) => {
  const gender = req.params.gender.toLowerCase();
  const filteredUsers = users.filter(
    (user) => user.gender.toLowerCase() === gender
  );

  if (filteredUsers.length > 0) {
    return res.json(filteredUsers);
  } else {
    return res
      .status(404)
      .json({ error: "No users found with the specified gender" });
  }
});


app
  .patch("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending" });
  });

  // to-do create an new user
});

app.listen(PORT, () => console.log(`server is started :${PORT}`));
