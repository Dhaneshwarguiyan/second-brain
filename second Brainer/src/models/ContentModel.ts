import mongoose from "mongoose";

//Content Schema

const contentSchema = new mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    description:String,
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})


const Content = mongoose.model('Content',contentSchema);

export default Content;