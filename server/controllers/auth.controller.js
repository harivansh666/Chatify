import { Socket } from "socket.io";
import userModel from "../models/user.model.js";
import { generateToken } from "../config/toke.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import cloudinary from "../config/cloudinary.config.js";
import { profile } from "console";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);
    return res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilepic: user.profilepic,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "somthing went wrong", success: false });
  }
};

const userschemavalidation = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  fullName: z.string().min(3).max(50),
});

const signup = async (req, res) => {
  const parsedData = userschemavalidation.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: parsedData.error.errors });
  }

  const { fullName, email, password } = parsedData.data;

  try {
    const existedUser = await userModel.findOne({ email: email });

    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(existedUser);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    if (createdUser) {
      generateToken(createdUser._id, res);

      await createdUser.save();

      return res.status(201).json({
        _id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        age: createdUser.age,
        gender: createdUser.gender,
        profilepic: createdUser.profilepic,
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    return res
      .clearCookie("auth", "", { maxAge: 0 })
      .status(200)
      .json("cookie removie successfull");
  } catch (error) {
    console.log(error.message);
  }
};

const profileUpdate = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userid = req.user._id;

    // console.log(userid);

    if (!profilepic) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updateUser = await userModel.findByIdAndUpdate(
      userid,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error is checkauth controller", error.message);
    return res.status(400).json(error.message);
  }
};
export { login, signup, logout, profileUpdate, checkAuth };
