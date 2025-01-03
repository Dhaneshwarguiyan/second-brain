import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    feedback:{
        type:String,
        required:true
    }
},{timestamps:true})

const Feedback = mongoose.model('Feedback',feedBackSchema);
export default Feedback;