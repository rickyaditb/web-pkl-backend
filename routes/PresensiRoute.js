import express from 'express';
import { getPresensi, getPresensiById, savePresensi, deletePresensi } from "../controller/PresensiController.js"

const router = express.Router();

router.get('/presensi', getPresensi);
router.get('/presensi/:id', getPresensiById)
router.post('/presensi', savePresensi);
router.delete('/presensi/:id', deletePresensi);

export default router;