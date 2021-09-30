import express  from "express";
import Data from "../Data";
import { getToken } from "../util";
import User from "../models/UserModel"
const router=express.Router();

router.post("/signin",async (req,res)=>{

try{
   const signinUser=await User.findOne({
       email:req.body.email,
       password:req.body.password
   })
   
   console.log("signinusers======",signinUser)
   if(signinUser){
       console.log(signinUser)
       res.send({
           _id:signinUser.id,
           name:signinUser.name,
           email:signinUser.email,
           isAdmin:signinUser.isAdmin,
           token:getToken(signinUser)
       })
   }
   else{
       res.status(401).send({msg:"Invalid user and password"})
   }
}catch(err){
    console.log("error is=",err.message)
}
})

router.post("/register",async (req,res)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,

    })
    const newUser=await user.save();
    if(newUser){
        res.send({
             _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token:getToken(newUser)
        })
    }
    else{
        res.status(401).send({msg:"Invalid user and password"})
    }
 })

router.get("/createadmin",async (req,res)=>{
    try{
    const user=new User({
        name:"deepak",
        email:"decomepak@gmail",
        password:1245,
        isAdmin:false
    })
    const newUser=await user.save()
    res.send(newUser)
}
catch(error){
    res.send({msg:error.message})
}
})

export default router