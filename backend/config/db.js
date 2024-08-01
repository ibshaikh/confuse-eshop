import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://shaikhibram:confuse12345@cluster0.lqjawnx.mongodb.net/confuseshop').then(()=>console.log("Database Connected Successfully !"));
}