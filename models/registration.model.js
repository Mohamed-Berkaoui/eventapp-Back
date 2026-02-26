const { default: mongoose } = require("mongoose");


const registrationSchema=new mongoose.Schema({
user:{type:mongoose.Types.ObjectId,required:true,ref:"user"},
event:{type:mongoose.Types.ObjectId,required:true, ref:"event"},
status:{type:String,enum: ['active','cancelled'], default: 'active' }
},{timestamps:true,versionKey:false})


const registrationModel=mongoose.model("registration",registrationSchema)

module.exports=registrationModel