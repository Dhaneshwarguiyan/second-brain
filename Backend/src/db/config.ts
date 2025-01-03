import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        //database connection
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Connected to Database');
    } catch (error) {
        console.log(error)
        console.log('Internal Error Please try again later')
    }
}

export default connectDb;