import express from 'express';
import { getUser, registerUser, deleteUser, loginUser, logoutUser } from "../controller/UserController.js";
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../controller/RefreshToken.js';

const router = express.Router();

router.get('/user', getUser);
router.post('/user', registerUser);
router.post('/login', loginUser);
router.get('/token', refreshToken);
router.delete('/logout', logoutUser);

router.delete('/user/:id', deleteUser);

export default router;