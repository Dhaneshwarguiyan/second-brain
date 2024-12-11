import mongoose from "mongoose";

//Tags Schema

 const tagSchema = new mongoose.Schema({
    title:String,
 },{
    timestamps:true
 })

const Tag = mongoose.model('Tag',tagSchema);

export default Tag;