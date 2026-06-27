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

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log("server connected at"+PORT);
})