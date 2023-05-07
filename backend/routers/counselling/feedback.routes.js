import express from 'express';
import { authenticate } from '../../middleware/authentication.js';
import { createFeedback, getFeedback } from '../../controllers/counselling/feedback/feedback.js';

const router = express.Router();

router.post('/',createFeedback);
router.get('/',getFeedback);

export default router;