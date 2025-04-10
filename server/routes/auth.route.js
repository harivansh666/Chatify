import express from "express";
const router = express.Router();
import { login, signup, logout, profileUpdate, checkAuth } from "../controllers/auth.controller.js";
import protect from '../middleware/auth.middleware.js'



router.post("/", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.put("/update-profile", protect ,profileUpdate)
router.get("/check", protect, checkAuth)
export default router;
