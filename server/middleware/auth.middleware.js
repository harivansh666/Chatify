import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";


dotenv.config();


const protect = async (req, res, next) => {

    const token = req.cookies.auth
    try {
        if(!token){
            return res.status(401).json({message: 'not have token'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'invalid token'})
        }
        const user = await userModel.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message: 'user not found'})
            }
            
            req.user = user;

            next()  
            
        // console.log(decoded);
    } catch (error) {
        console.log("error in protect middleware", error.message);
        res.status(500).json({ message: "Not authorized" });  
              
    }
}
export default protect;
