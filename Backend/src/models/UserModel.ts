import mongoose from "mongoose";

//User Schema

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        unique:true,
        // required:true
    },
    username:{
        type:String,
        required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema);

export default User;