import express from 'express';
import { authenticate } from '../../middleware/authentication.js';
import { createFeedback, getFeedback, deleteFeedback } from '../../controllers/counselling/feedback/feedback.js';

const router = express.Router();

router.post('/', authenticate, createFeedback);
router.get('/', authenticate, getFeedback);
router.delete('/:id', authenticate, deleteFeedback);

export default router;