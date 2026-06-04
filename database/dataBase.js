import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoDbUri = "mongodb://localhost:27017/online-task-manager";


export const connectDb = async () => {
    try {
        await mongoose.connect(mongoDbUri, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("Data base is connected successfully");
    } catch (error) {
        console.log(" Data baese file ::", error.message)
    }
}

