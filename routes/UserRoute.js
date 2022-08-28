import express from 'express';
import { getUser, registerUser, deleteUser } from "../controller/UserController.js"

const router = express.Router();

router.get('/user', getUser);
router.post('/user', registerUser);
router.delete('/user/:id', deleteUser);

export default router;