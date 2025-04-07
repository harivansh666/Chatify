import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/auth.controller.js";
// import auth from "./middleware/auth.middleware.js";


router.post("/", login);
router.post("/signup", signup);
export default router;
