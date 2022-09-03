import Presensi from "../models/PresensiModel.js";
import User from "../models/UserModel.js"

const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

export const getDetailPresensi = async (req, res) => {
    try {
        const user = await User.find({}).populate('absensi')
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllPresensi = async (req, res) => {
    try {
        const presensi = await Presensi.find().sort({waktu_absensi: -1});
        res.json(presensi);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPresensiUser = async (req, res) => {
    try {
        const presensi = await Presensi.find({
            'id_user': req.params.id
        }).sort({waktu_absensi: -1});
        res.json(presensi);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPresensiToday = async (req, res) => {
    try {
        const presensi = await Presensi.findOne({
            'id_user': req.params.id,
            'waktu_absensi': {
                $gte: start,
                $lt: end
            }
        });
        res.json(presensi);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPresensiById = async (req, res) => {
    try {
        const presensi = await Presensi.findById(req.params.id);
        res.json(presensi);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const savePresensi = async (req, res) => {
    const presensi = new Presensi(req.body);
    try {
        const insertedpresensi = await presensi.save();
        const user = await User.findOneAndUpdate(
            { _id: req.body.id_user},
            { $push: { absensi: insertedpresensi._id}}
        )
        res.status(201).json(insertedpresensi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deletePresensi = async (req, res) => {
    try {
        const deletedpresensi = await Presensi.deleteOne({_id: req.params.id});
        res.status(200).json(deletedpresensi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}