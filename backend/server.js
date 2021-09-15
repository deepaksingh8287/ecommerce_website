import userRoute from "./routes/UserRoute";
import bodyParser from "body-parser";
import indeed from "./indeed";
import express from "express";
import Data from "./Data";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/productRoute"
// const cors=require("cors")

dotenv.config();

const mongodburl=indeed.MONGODB_URL;

console.log("config=",mongodburl)

const connect=mongoose.connect(mongodburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).catch(err=>console.log(err.message))

if(connect){
    console.log("mongodb database connected successfully");
}
else{
    console.log("database not connected")
}

mongoose.connection
.once("open",()=>console.log("database connected successfuylly"))
.on("error",error=>console.log("Your error",error))

const app=express();
app.use(bodyParser.json())
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
// app.get("/api/products/:id",(req,res)=>{
//     const productId=req.params.id;
//     const product=Data.products.find(x=>x._id===productId);
//     if(product){
//     res.send(product)
//     }else{
//         res.status(404).send({msg:"Product Not Found"},)
//     }
// })
// app.get("/api/products",(req,res)=>{
//     res.send(Data.products)
// })
app.listen(5000,()=>{
    console.log("server running at http://localhost:5000");
})

