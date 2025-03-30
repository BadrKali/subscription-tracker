import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI) {
    console.error("MongoDB URI is required");
    process.exit(1);
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected: ${NODE_ENV}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectToDB;