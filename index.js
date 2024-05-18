const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 7000;

app.use(express.urlencoded({extended: false}));   // middleware - Plugin

app.get('/api/users', (req, res) =>{
    return res.json(users);
});

app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
 
})
.patch((req, res) => {
    return res.json({status: "pending"})
})
.delete((req,res) => {
    return res.json({status:"pending"})
})

app.post("/api/users", (req,res) =>{
    const body = req.body;
    console.log("body", body)
    return res.json({status: "pending"})          // to-do create an new user
    console.log(app)
})


app.listen(PORT, () => console.log(`server is started :${PORT}`));