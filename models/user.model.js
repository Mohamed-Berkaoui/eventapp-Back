const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: {type:String,required:true,trim:true},
  role: { type: String, enum: ["user", "organizer"], default: "user" },
},{versionKey:false,timestamps:true});

const userModel=mongoose.model("user",userSchema)

module.exports=userModel
