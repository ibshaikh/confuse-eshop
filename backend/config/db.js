import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('YOUR MONGODB URL').then(()=>console.log("Database Connected Successfully !"));
}