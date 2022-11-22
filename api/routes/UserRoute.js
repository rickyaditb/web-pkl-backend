import express from 'express';
import { getUserByPembimbing, hapusUser, uploadLaporan, updateLaporan, uploadImg, getUser, getPembimbing, getUserByEmail, changePassword, changeTelepon, changeEmail, getUserById, registerUser, deleteUser, loginUser, logoutUser, uploadProfile } from "../controller/UserController.js";
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controller/RefreshToken.js';

const router = express.Router();

router.get('api/user', getUser);
router.get('api/pembimbing', getPembimbing);
router.get('api/user/:id', getUserById);
router.get('api/user_pembimbing/:id', getUserByPembimbing);
router.post('api/user', registerUser);
router.post('api/login', loginUser);
router.patch('password/:id', changePassword);
router.patch('telepon/:id', changeTelepon);
router.patch('api/email/:id', changeEmail);
router.get('api/login/:id', getUserByEmail);
router.get('api/token', refreshToken);
router.delete('api/logout', logoutUser);
router.delete('/hapus_user/:id', hapusUser);
router.post('/image', uploadImg.single('image'), uploadProfile);
router.post('/file_laporan', uploadLaporan.single('laporan'), updateLaporan);

router.delete('/user/:id', deleteUser);

export default router;