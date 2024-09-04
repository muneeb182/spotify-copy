import mongoose from "mongoose";

// connect with mongodb database
const connectDB = async() =>{
    // To see our database is connected
    mongoose.connection.on('connected',()=>{
        console.log('Connection established');
        
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
}

export default connectDB;