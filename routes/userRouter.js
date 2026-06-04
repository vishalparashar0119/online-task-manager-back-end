import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { getUser, updateUser } from '../controllers/userController.js';


const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/getuser', isLoggedIn, getUser);

router.patch('/updateuser', isLoggedIn, updateUser);

export default router;