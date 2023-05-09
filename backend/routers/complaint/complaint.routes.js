import express from 'express';
import { createComplaint, getComplaints } from '../../controllers/complaint/complaint.js';

const router = express.Router();

router.post('/', createComplaint);
router.get('/', getComplaints);

export default router;