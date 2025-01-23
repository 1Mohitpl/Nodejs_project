const express = require("express");
const fs = require("fs");
const {connectionMongoDB} = require('./connection')
const userRouter = require("./Routes/User")
const mongoose = require("mongoose");

const app = express();
const PORT = 7000;

//connections




connectionMongoDB("mongodb://127.0.0.1:27017/instgram-app-1");



// app.use((req, res, next)=>{
//   console.log("middleware 1")
//    next();                       
//                   // middleware 1
// });

// app.use((req, res, next) =>{
//   console.log("middleware 2")    //middleware 2
//   next();
// })

//create schema

// const userSchema = new mongoose.Schema({ 
//      first_name : {
//       type: String,
//        required : true,
//      },

//      last_name : {
//        type: String,
//        required: false,     
//   },

//     email : {
//       type: String,
//       required:true,
//       unique: true,

//     },
//     Job_title:{
//       type: String
//     },

//     gender:{
//       type: String
//     }
   
// },{timestamps : true});






app.use(express.urlencoded({ extended: false })); // middleware - Plugin

app.use("/user", userRouter);   // if any request hit on /user, use userouter




app.listen(PORT, () => console.log(`server is started :${PORT}`));
