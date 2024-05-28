const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { type } = require("os");



const app = express();
const PORT = 7000;


//mongoDB connections

mongoose.connect("mongodb://127.0.0.1:27017/instgram-app-1")
.then(()=>console.log("MongoDb is connected"))
.catch((err)=> console.log("Mongo error", err));


//create schema

const userSchema = new mongoose.Schema({ 
     first_name : {
      type: String,
       required : true,
     },

     last_name : {
       type: String,
       required: false,     
  },

    email : {
      type: String,
      required:true,
      unique: true,

    },
    Job_title:{
      type: String
    },

    gender:{
      type: String
    }
   
},{timestamps : true});

//create model
const customer = mongoose.model("customer",userSchema);





app.use(express.urlencoded({ extended: false })); // middleware - Plugin


app.use((req, res, next)=>{
  console.log("middleware 1")
   next();                       
                  // middleware 1
});

app.use((req, res, next) =>{
  console.log("middleware 2")    //middleware 2
  next();
})

app.get("/api/users", async(req, res) => {
  const alldbusers = await customer.find({});
  // res.setHeader("myname", "mohit paul");    //custom header; always add x TO custom headers
  return res.json(alldbusers);
});

app.route("/api/users/:gender/:id")

// get the users accridng to thier id
app
.get("/api/users/id/:id", async (req, res) => {
  const userid = await customer.findById(req.params.id);

if (userid) {
    return res.json(userid);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
})



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
})

app.patch("/api/users/id/:id", async(req, res) => {

  await customer.findByIdAndUpdate(req.params.id, {last_name:"saha"});
  return res.json({status: "success"});
    // req.params.id *1;
  // const result = users.find((result) => result.id === id);
  })
  
  app.delete("/api/users/id/:id",async (req, res) => {
    await customer.findByIdAndDelete(req.params.id)
    return res.json({ status: "succuss" });
  });

app.post("/api/users", async(req, res) => {
  const body = req.body;
  
  if(
    !body ||
    !body.first_name||
    !body.last_name||
    !body.email||
    !body.gender||
    !body.Job_title
  ){
     return res.status(400).json({msg: "all fields are required..."});
  }
    
const result = await customer.create({
  first_name :body.first_name,
  last_name : body.last_name,
  email: body.email,
  gender:body.gender,
  Job_title:body.Job_title,
});
console.log("result is here :", result)

return res.status(201).json({msg: "Success"})
  // to-do create an new user
});

app.listen(PORT, () => console.log(`server is started :${PORT}`));
