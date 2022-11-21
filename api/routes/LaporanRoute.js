import express from "express";
import { getDetailLaporanByPembimbing, getAllLaporan, getLaporanUser, getDetailLaporan, getDetailLaporanById, getLaporanById, saveLaporan, updateLaporan, deleteLaporan } from "../controller/LaporanController.js"

const router = express.Router();

router.get('/laporan', getAllLaporan);
router.get('/laporan_detail', getDetailLaporan);
router.get('/laporan_pembimbing/:id', getDetailLaporanByPembimbing);
router.get('/laporan_detail/:id', getDetailLaporanById);
router.get('/laporan_user/:id', getLaporanUser);
router.get('/laporan/:id', getLaporanById);
router.post('/laporan', saveLaporan);
router.patch('/laporan/:id', updateLaporan);
router.delete('/laporan/:id', deleteLaporan);

export default router;