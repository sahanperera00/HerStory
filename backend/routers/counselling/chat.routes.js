import express from "express";

import { accessChat, fetchChats } from "../../controllers/counselling/chat/chatController.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/",authenticate,accessChat);
router.get("/",authenticate,fetchChats);

export default router;