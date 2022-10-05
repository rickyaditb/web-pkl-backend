import express from 'express';
import { hapusUser, uploadLaporan, updateLaporan, uploadImg, getUser, getPembimbing, getUserByEmail, changePassword, changeTelepon, changeEmail, getUserById, registerUser, deleteUser, loginUser, logoutUser, uploadProfile } from "../controller/UserController.js";
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controller/RefreshToken.js';

const router = express.Router();

router.get('/user', getUser);
router.get('/pembimbing', getPembimbing);
router.get('/user/:id', getUserById);
router.post('/user', registerUser);
router.post('/login', loginUser);
router.patch('/password/:id', changePassword);
router.patch('/telepon/:id', changeTelepon);
router.patch('/email/:id', changeEmail);
router.get('/login/:id', getUserByEmail);
router.get('/token', refreshToken);
router.delete('/logout', logoutUser);
router.delete('/hapus_user/:id', hapusUser);
router.post('/image', uploadImg.single('image'), uploadProfile);
router.post('/file_laporan', uploadLaporan.single('laporan'), updateLaporan);

router.delete('/user/:id', deleteUser);

export default router;