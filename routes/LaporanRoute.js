import express from "express";
import { getAllLaporan, getLaporanUser, getDetailLaporan, getLaporanById, saveLaporan, updateLaporan, deleteLaporan } from "../controller/LaporanController.js"

const router = express.Router();

router.get('/laporan', getAllLaporan);
router.get('/laporan_pembimbing', getDetailLaporan);
router.get('/laporan_user/:id', getLaporanUser);
router.get('/laporan/:id', getLaporanById);
router.post('/laporan', saveLaporan);
router.patch('/laporan/:id', updateLaporan);
router.delete('/laporan/:id', deleteLaporan);

export default router;