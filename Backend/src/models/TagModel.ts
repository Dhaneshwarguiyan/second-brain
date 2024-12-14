import mongoose from "mongoose";

//Tags Schema

 const tagSchema = new mongoose.Schema({
    text:{type:String,unique:true},
 },{
    timestamps:true
 })

const Tag = mongoose.model('Tag',tagSchema);

export default Tag;
