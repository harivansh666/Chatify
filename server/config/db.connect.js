import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
      tlsInsecure: false, // Disable for production
      retryWrites: true,
    });
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
