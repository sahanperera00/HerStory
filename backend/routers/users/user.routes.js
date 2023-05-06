import express from 'express';
import cors from 'cors';
import { getUserBiobyEmail } from '../../controllers/users/clientUserInfo.js';
import { loginUser,registerUser } from '../../controllers/users/userController.js';


const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/getUserBiobyEmail',getUserBiobyEmail);



export default router;