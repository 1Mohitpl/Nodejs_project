const express = require("express");

const router = express.Router();

router.use((req, res, next)=>{
    console.log("middleware 1")
     next();                       
                    // middleware 1
  });
  
  router.use((req, res, next) =>{
    console.log("middleware 2")    //middleware 2
    next();
  })
  
  router.get("/", async(req, res) => {
    const alldbusers = await customer.find({});
    // res.setHeader("myname", "mohit paul");    //custom header; always add x TO custom headers
    return res.json(alldbusers);
  });
  
  router.route(":gender/:id")
  
  // get the users accridng to thier id
  router
  .get("id/:id", async (req, res) => {
    const userid = await customer.findById(req.params.id);
  
  if (userid) {
      return res.json(userid);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  
  
  
  // for get the user accoring to their gender
  router.get("gender/:gender", (req, res) => {
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
  
  router.patch("id/:id", async(req, res) => {
  
    await customer.findByIdAndUpdate(req.params.id, {last_name:"saha"});
    return res.json({status: "success"});
      // req.params.id *1;
    // const result = users.find((result) => result.id === id);
    })
    
    router.delete("id/:id",async (req, res) => {
      await customer.findByIdAndDelete(req.params.id)
      return res.json({ status: "succuss" });
    });
  
    router.post("/", async(req, res) => {
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

  module.exports = router();
