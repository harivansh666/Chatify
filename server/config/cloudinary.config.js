import { v2 as cloudinary } from "cloudinary";
import {config} from 'dotenv'

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINAR_API,
    api_secret: process.env.CLOUDINAR_PASS_SEC
    
})

export default cloudinary;
