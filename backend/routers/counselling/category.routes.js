import express from 'express';
import { authenticate } from '../../middleware/authentication.js';
import { createCategory, getCategory } from '../../controllers/counselling/category/category.js';

const router = express.Router();

router.post('/',createCategory);
router.get('/',getCategory);

export default router;