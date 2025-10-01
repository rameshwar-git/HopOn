import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI_OFFLINE);

    await mongoose.connect(process.env.MONGO_URI_OFFLINE || "");
    console.log(`MongoDB connected ${mongoose.connection.host} `);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } 
};