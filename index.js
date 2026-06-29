const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Student = require("./modeles/Student");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("MONGODB CONNECTED");
})
.catch((err) => {
    console.log("unable to connect DB ", err);
});

app.post("/api/students", async(req,res) =>{
    try {
        const students = await Student.create(req.body);
        res.json({
            message:"record saved",
            data : students
        });

    }
    catch (err) {
        console.log("unable to store data",err);
    }
});

app.get("/api/students",async(req,res) =>{
    try {
        const students = await Student.find();
        res.json({
            message:"all record ",
            data:students
        });
    }catch (err) {
        console.log("record mill nhi " ,err);
    }

});

app.put("/api/students/:id",async(req,res) =>{
    try{
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id,req.body);
        if(!student){
            return res.status(404).json({
                success:false,
                message:"student not found"
            })
        }
        res.json({
            message:"record updated"
        })
    }
    catch(err){
        console.log("unable to update",err);
    }    
});

app.delete("/api/students/:id",async (req,res) => {
    try {
        const{id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(401).json({
                message:"invalid students id"
            });
        }
        res.json({
            message:"record deleted"
        });
    }
    catch(err){
        console.log("unable to delete",err);
    }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log("server connected at"+PORT);
})