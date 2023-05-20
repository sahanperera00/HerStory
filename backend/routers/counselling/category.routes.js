import express from 'express';
import { authenticate } from '../../middleware/authentication.js';
import { createCategory, getCategory, deleteCategory, updateCategory, getVisibleCategories } from '../../controllers/counselling/category/category.js';

const router = express.Router();

router.post('/', authenticate, createCategory);
router.get('/', authenticate, getCategory);
router.delete('/:id', authenticate, deleteCategory);
router.post('/:id', authenticate, updateCategory);
router.get('/visible', getVisibleCategories);

export default router;