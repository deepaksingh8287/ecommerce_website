import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,require:true,default:false},
})

const UserModel=mongoose.model("User",userSchema)

export default UserModel;