import express from "express";
import { getLaporan, getLaporanById, saveLaporan, updateLaporan, deleteLaporan } from "../controller/LaporanController.js"

const router = express.Router();

router.get('/laporan', getLaporan);
router.get('/laporan/:id', getLaporanById);
router.post('/laporan', saveLaporan);
router.patch('/laporan/:id', updateLaporan);
router.delete('/laporan/:id', deleteLaporan);

export default router;