import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";
import cloudinary from "../config/cloudinary.config.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const logedinuserid = req.user._id;
    const filtredUser = await userModel
      .find({ _id: { $ne: logedinuserid } })
      .select("-password");
    console.log(filtredUser);
    // iss da matlab aa ke menu id (_id:) de sare users de but not logedinuserid de.
    res.status(200).json(filtredUser);
  } catch (error) {
    console.error("error in getuserforsliders:- ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const message = await messageModel
      .find({
        $or: [
          { senderid: myId, receiverid: receiverid },
          { senderid: receiverid, receiverid: myId },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const { id: senderId } = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      senderid,
      receiverid,
      text,
      image: imageUrl,
    });
    await message.save();
    //todo: real time functinality here
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json("message not send server error");
  }
};

export { getUsersForSidebar, getMessages, sendMessage };
