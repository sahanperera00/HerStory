import express from 'express';
import {getCounsellorInfo, createCounsellorInfo} from '../../controllers/users/counsellor.js';
import {authenticate} from '../../middleware/authentication.js';

const router = express.Router();

router.post('/',createCounsellorInfo);
router.get('/',getCounsellorInfo);

export default router;
