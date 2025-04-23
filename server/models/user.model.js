import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserModel", userModel);
