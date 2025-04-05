import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/auth.controller.js";

router.post("/", login);
router.post("/signup", signup);
export default router;
