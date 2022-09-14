import Presensi from "../models/PresensiModel.js";
import User from "../models/UserModel.js"
import moment from "moment";
import momentBusiness from "moment-business-days";

const hari_ini = moment();

const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);

export const getDetailPresensi = async (req, res) => {
    try {
        const kirim = [];
        const user = await User.find({
            'role': 'user'
        }).populate('absensi');
        user.map((item, index) => {
            let isi_status = (hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) ? "Aktif" : "Non Aktif";
            let tanggalMulai = moment(item.tanggal_mulai).startOf('day')
            let hariIni = moment().startOf('day')
            let jumlahHari = momentBusiness(hariIni).businessDiff(moment(tanggalMulai));
            kirim.push({
                _id: item._id,
                nama: item.nama,
                asal_instansi: item.asal_instansi,
                hadir: 0,
                terlambat: 0,
                sakit: 0,
                izin: 0,
                alpha: 0,
                status: isi_status
            })
            let hadir = 0;
            let sakit = 0;
            let izin = 0;
            let totalHari = 0;
            const absen = item.absensi.filter((value) => {
                if(value.keterangan == "Hadir") {
                    hadir = hadir + 1;
                    kirim[index]['hadir'] = hadir;
                    totalHari = totalHari + 1;
                } else if(value.keterangan == "Sakit") {
                    sakit = sakit + 1;
                    kirim[index]['sakit'] = sakit;
                    totalHari = totalHari + 1;
                } else if(value.keterangan == "Izin") {
                    izin = izin + 1;
                    kirim[index]['izin'] = izin;
                    totalHari = totalHari + 1;
                }
                // console.log("Keterangan : " + value.keterangan)
            })
            kirim[index]['alpha'] = jumlahHari-totalHari;
        })
        res.json(kirim);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getDetailPresensiById = async (req, res) => {
    try {
        const kirim = [];
        const user = await User.find({
            '_id': req.params.id
        }).populate('absensi')
        user.map((item, index) => {
            let isi_status = (hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) ? "Aktif" : "Non Aktif";
            let tanggalMulai = moment(item.tanggal_mulai).startOf('day')
            let hariIni = moment().startOf('day')
            let jumlahHari = momentBusiness(hariIni).businessDiff(moment(tanggalMulai));
            kirim.push({
                _id: item._id,
                nama: item.nama,
                asal_instansi: item.asal_instansi,
                hadir: 0,
                terlambat: 0,
                sakit: 0,
                izin: 0,
                alpha: 0,
                status: isi_status
            })
            let hadir = 0;
            let sakit = 0;
            let izin = 0;
            let totalHari = 0;
            const absen = item.absensi.filter((value) => {
                if(value.keterangan == "Hadir") {
                    hadir = hadir + 1;
                    kirim[index]['hadir'] = hadir;
                    totalHari = totalHari + 1;
                } else if(value.keterangan == "Sakit") {
                    sakit = sakit + 1;
                    kirim[index]['sakit'] = sakit;
                    totalHari = totalHari + 1;
                } else if(value.keterangan == "Izin") {
                    izin = izin + 1;
                    kirim[index]['izin'] = izin;
                    totalHari = totalHari + 1;
                }
                // console.log("Keterangan : " + value.keterangan)
            })
            kirim[index]['alpha'] = jumlahHari-totalHari;
        })
        res.json(kirim);
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