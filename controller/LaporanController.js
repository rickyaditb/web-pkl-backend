import Laporan from "../models/LaporanModel.js";

export const getLaporan = async (req, res) => {
    try {
        const laporans = await Laporan.find();
        res.json(laporans);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getLaporanById = async (req, res) => {
    try {
        const laporan = await Laporan.findById(req.params.id);
        res.json(laporan);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveLaporan = async (req, res) => {
    const laporan = new Laporan(req.body);
    try {
        const insertedlaporan = await laporan.save();
        res.status(201).json(insertedlaporan);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateLaporan = async (req, res) => {
    try {
        const updatedlaporan = await Laporan.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedlaporan);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteLaporan = async (req, res) => {
    try {
        const deletedlaporan = await Laporan.deleteOne({_id: req.params.id});
        res.status(200).json(deletedlaporan);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}