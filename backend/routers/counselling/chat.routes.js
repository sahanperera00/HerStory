import express from "express";

import { accessChat } from "../../controllers/counselling/chat/chatController.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/accessChat",authenticate,accessChat);

export default router;