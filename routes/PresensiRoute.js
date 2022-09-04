import express from 'express';
import { getAllPresensi, getDetailPresensiById, getDetailPresensi, getPresensiUser, getPresensiById, savePresensi, deletePresensi, getPresensiToday } from "../controller/PresensiController.js"

const router = express.Router();

router.get('/presensi', getAllPresensi);
router.get('/presensi_detail', getDetailPresensi);
router.get('/presensi_detail/:id', getDetailPresensiById);
router.get('/presensi_user/:id', getPresensiUser);
router.get('/presensi_today/:id', getPresensiToday);
router.get('/presensi/:id', getPresensiById)
router.post('/presensi', savePresensi);
router.delete('/presensi/:id', deletePresensi);

export default router;