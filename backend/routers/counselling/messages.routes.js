import express from 'express';
import { authenticate } from '../../middleware/authentication.js';
import { sendMessage, allMessages} from "../../controllers/counselling/chat/messageController.js";

const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/:chatId', authenticate, allMessages);

export default router;

 