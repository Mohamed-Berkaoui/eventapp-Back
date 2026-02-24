const { default: mongoose } = require("mongoose");

const eventSchema=new mongoose.Schema({
  title: {type:String,required:true,trim:true},
  description: String,
  date: String,
  location: {type:String,required:true},
  capacity: Number,
  imageUrl: String,
  organizer: { type: mongoose.Types.ObjectId, ref: 'user' },
  status: { type: String, enum: ['active','cancelled'], default: 'active' },
},{timestamps:true,versionKey:false})

const eventModel=mongoose.model('event',eventSchema)


module.exports=eventModel