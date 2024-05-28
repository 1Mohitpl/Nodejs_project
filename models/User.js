const mongoose = require("mongoose");


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


module.exports = customer;