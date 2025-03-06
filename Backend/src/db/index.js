import mongoose from "mongoose";
import { DB_NAME } from "../../src/constants.js";
import "dotenv/config";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      // `${process.env.MONGODB_URL}/${DB_NAME}`
      `${process.env.MONGODB_URL}`
    );
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance}`);
  } catch (error) {
    console.error("Error occured while connecting to Database:", error);
    process.exit(1);
  }
}

export default connectDB;
