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
    },
    linkTitle:{
    	type:String
    },
    image:{
        type:String,
    },
    description:String,
    tags:[{
        type:String,
        unique:true
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})


const Content = mongoose.model('Content',contentSchema);

export default Content;
