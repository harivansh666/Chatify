import mongoose, { Types } from "mongoose";
import { array } from "zod";

const userMessage = new mongoose.Schema(
  {
    senderid: {
      type: String,
    },
    receiverid: {},
    message: {
      type: String,
    },
    image: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserMessage", userMessage);
