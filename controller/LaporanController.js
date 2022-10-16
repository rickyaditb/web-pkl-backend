import Laporan from "../models/LaporanModel.js";
import User from "../models/UserModel.js"
import moment from "moment";

const hari_ini = moment();

export const getDetailLaporan = async (req, res) => {
    try {
        const kirim = [];
        const user = await User.find({
            'role': 'user'
        }).populate('laporan').populate("pembimbing")
        user.map((item, index) => {
            let isi_status = (hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) ? "Aktif" : "Non Aktif";
            kirim.push({
                _id: item._id,
                nama: item.nama,
                asal_instansi: item.asal_instansi,
                jumlah_laporan: 0,
                status: isi_status,
                pembimbing: item.pembimbing
            })
            let jumlah_laporan = 0;
            const absen = item.laporan.filter((value) => {
                if(value) {
                    jumlah_laporan = jumlah_laporan + 1;
                    kirim[index]['jumlah_laporan'] = jumlah_laporan;
                }
                // console.log("Keterangan : " + value.keterangan)
            })
        })
        res.json(kirim);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getDetailLaporanByPembimbing = async (req, res) => {
    try {
        const kirim = [];
        const user = await User.find({
            'pembimbing': req.params.id
        }).populate('laporan')
        user.map((item, index) => {
            let isi_status = (hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) ? "Aktif" : "Non Aktif";
            kirim.push({
                _id: item._id,
                nama: item.nama,
                asal_instansi: item.asal_instansi,
                jumlah_laporan: 0,
                status: isi_status
            })
            let jumlah_laporan = 0;
            const absen = item.laporan.filter((value) => {
                if(value) {
                    jumlah_laporan = jumlah_laporan + 1;
                    kirim[index]['jumlah_laporan'] = jumlah_laporan;
                }
                // console.log("Keterangan : " + value.keterangan)
            })
        })
        res.json(kirim);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getDetailLaporanById = async (req, res) => {
    try {
        const kirim = [];
        const user = await User.find({
            '_id': req.params.id
        }).populate('laporan')
        user.map((item, index) => {
            let isi_status = (hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) ? "Aktif" : "Non Aktif";
            kirim.push({
                _id: item._id,
                nama: item.nama,
                asal_instansi: item.asal_instansi,
                jumlah_laporan: 0,
                status: isi_status,
                gambar: item.gambar
            })
            let jumlah_laporan = 0;
            const absen = item.laporan.filter((value) => {
                if(value) {
                    jumlah_laporan = jumlah_laporan + 1;
                    kirim[index]['jumlah_laporan'] = jumlah_laporan;
                }
                // console.log("Keterangan : " + value.keterangan)
            })
        })
        res.json(kirim);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllLaporan = async (req, res) => {
    try {
        const laporans = await Laporan.find().sort({tanggal_laporan: -1});
        res.json(laporans);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getLaporanUser = async (req, res) => {
    try {
        const laporans = await Laporan.find({
            'id_user': req.params.id
        }).sort({tanggal_laporan: -1});
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
        const user = await User.findOneAndUpdate(
            { _id: req.body.id_user},
            { $push: { laporan: insertedlaporan._id}}
        )
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