import express from 'express';
import cors from 'cors';
import { getUserBiobyEmail } from '../../controllers/users/clientUserInfo.js';
import { getAllUsers, loginUser,registerUser, deleteUser } from '../../controllers/users/userController.js';
import { authenticate } from '../../middleware/authentication.js';



const router = express.Router();

router.get('/users',authenticate,getAllUsers);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/getUserBiobyEmail',authenticate,getUserBiobyEmail);   //authenticate will authenticate if the logged in user is accessing the route
router.delete('/:id', deleteUser)


export default router;