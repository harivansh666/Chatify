import { Socket } from "socket.io";
import userModel from "../models/user.model.js";
import {generateToken} from "../config/toke.js";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6).max(20),
// }) 
const login = async (req, res) => {
const {email, password}=req.body
try {

  const user = await userModel.findOne({ email });
const isValidPassword = await bcrypt.compare(password, user.password);

if (!isValidPassword) {
  return res.status(401).json({ message: "Invalid email or password" });
}

generateToken(user._id, res )
res.json(
  { _id: user._id,
  fullname: user.fullname,
  email: user.email,
  age: user.age,
  gender: user.gender,
  profilepic: user.profilepic,
  message: "User created successfully"})

} catch (error) {
 console.log(error); 
}

};

const userschemavalidation = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  fullname: z.string().min(3).max(50),
  age: z.number().min(18).max(99),
  gender: z.enum(["Male", "Female"]),
});


const signup = async (req, res) => {
  const parsedData = userschemavalidation.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: parsedData.error.errors });
  }
  
  const { fullname, email, password, age, gender } = parsedData.data;

  try {
    const existedUser = await userModel.findOne({ email: email });

    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(existedUser);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await new userModel({
      fullname,
      email,
      password: hashedPassword,
      age,
      gender,
    });
    
    if (createdUser) {
      generateToken(createdUser._id, res )
      await createdUser.save();
      res.status(201).json({ 
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        age: createdUser.age,
        gender: createdUser.gender,
        profilepic: createdUser.profilepic,
        message: "User created successfully"});
    }
  } catch (error) {
    console.log(error.message );
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req,res) =>{
  try{
    res.clearCookie('auth', "", {maxAge:0}).status(200).json("cookie removie successfull");
  }catch(error){
    console.log(error.message)
  }
}

export { login, signup, logout };
