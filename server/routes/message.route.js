import express from 'express'

const router = express.Router()

import protect from '../middleware/auth.middleware.js'
import { getUsersForSidebar,getMessages, sendMessage } from '../controllers/message.controller.js'


router.get("/users", protect, getUsersForSidebar )
router.get("/:id", protect, getMessages );

router.post("/send/:id", protect, sendMessage)// "/senfd/:id" ---> means jis user(/:id) nu message send krna hai.

export default router