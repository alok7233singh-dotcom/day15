const mongoose = require("mongoose");
const { type } = require("node:os");

const studentSchema = new mongoose.Schema({
 name:{
    type:String,
    require:true
 },
 email:{
    type:String,
    required:true,
    unique: true
 },
 city:{
    type:String,
    default:"gkp"
 },
 age:{
    type:Number
 }

},{
    timestamps: true
});

module.exports = mongoose.model("Student",studentSchema);