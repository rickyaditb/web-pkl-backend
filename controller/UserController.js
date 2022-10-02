import User from "../models/UserModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import moment from 'moment';
import multer from 'multer';
import path from 'node:path';

const storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.id_user + path.extname(file.originalname))
    }
})

const storageLaporan = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './laporan')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.id_user + path.extname(file.originalname))
    }
})

export const uploadImg = multer({
    storage: storageImg
})

export const uploadLaporan = multer({
    storage: storageLaporan
})

export const uploadProfile = async (req, res) => {
    try {
        const formatFile = path.extname(req.file.originalname);
        const updateduser = await User.updateOne({_id: req.body.id_user}, {$set: {gambar: formatFile}});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateLaporan = async (req, res) => {
    try {
        res.status(200).json("OKE");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const changeTelepon = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id: req.params.id}, {$set: {telepon: req.body.telepon}});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const changeEmail = async (req, res) => {
    try {
        const cekUser = await User.findOne({
            'email': req.body.email
        })
        if (cekUser) return res.status(400).json({ message: "Email yang sudah anda pakai sudah terdaftar!" });
        const updateduser = await User.updateOne({_id: req.params.id}, {$set: {email: req.body.email}});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const changePassword = async (req, res) => {
    try {
        const user = await User.findOne({
            '_id': req.params.id
        }).select(['_id', 'password']);
        const match = await bcrypt.compare(req.body.passwordLama, user.password);
        if (!match) return res.status(400).json({ message: "Kata Sandi Lama Salah" });
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.passwordBaru, salt);
        const updateduser = await User.updateOne({_id: req.params.id}, {$set: {password: hashPassword}});
        res.json(updateduser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const hari_ini = moment();
    try {
        const user = await User.find({
            'role': 'user'
        }).select(['_id', 'email', 'telepon', 'nama', 'asal_instansi', 'role', 'tanggal_mulai', 'tanggal_selesai', 'absensi', 'laporan', 'pembimbing', 'gambar']).populate("pembimbing");
        const kirim = []
        user.map((item, index) => {
            if(hari_ini > item.tanggal_mulai && hari_ini < item.tanggal_selesai) {
                kirim.push({
                    ...item._doc,
                    status: "Aktif"
                })
            } else {
                kirim.push({
                    ...item._doc,
                    status: "Non Aktif"
                })
            }
        })
        res.json(kirim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPembimbing = async (req, res) => {
    try {
        const user = await User.find({
            'role': 'pembimbing'
        }).select(['_id', 'email', 'telepon', 'nama', 'asal_instansi','role']);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            'email': req.params.id
        }).select(['_id', 'email', 'telepon', 'nama', 'asal_instansi', 'role', 'tanggal_mulai', 'tanggal_selesai', 'absensi', 'laporan', 'pembimbing', 'gambar']).populate("pembimbing");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    const hari_ini = moment();
    try {
        const user = await User.findOne({
            '_id': req.params.id
        }).select(['_id', 'email', 'telepon', 'nama', 'asal_instansi', 'role', 'tanggal_mulai', 'tanggal_selesai', 'absensi', 'laporan', 'pembimbing', 'gambar']).populate("pembimbing");
        let kirim = {}
        if(hari_ini > user.tanggal_mulai && hari_ini < user.tanggal_selesai) {
            kirim = {
                ...user._doc,
                status: "Aktif"
            }
        } else {
            kirim = {
                ...user._doc,
                status: "Non Aktif"
            }
        }
        res.json(kirim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const registerUser = async (req, res) => {
    const { email, telepon, nama, asal_instansi, role, tanggal_mulai, tanggal_selesai, password, confPassword, pembimbing } = req.body;

    const cekUser = await User.findOne({
        'email': req.body.email
    })

    if (cekUser) return res.status(400).json({ message: "Email yang sudah anda pakai sudah terdaftar!" });

    if (password !== confPassword) return res.status(400).json({ message: "Kata Sandi dan Konfirmasi Kata Sandi Tidak Sesuai" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    let user = {};

    if(pembimbing) {
        user = new User({
            email: email,
            telepon: telepon,
            nama: nama,
            asal_instansi: asal_instansi,
            role: role,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            password: hashPassword,
            pembimbing: pembimbing
        })
    } else {
        user = new User({
            email: email,
            telepon: telepon,
            nama: nama,
            asal_instansi: asal_instansi,
            role: role,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            password: hashPassword
        })
    }

    try {
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            'email': req.body.email
        })
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ message: "Kata Sandi Salah" });
        const userId = user._id;
        const nama = user.nama;
        const email = user.email;
        const accessToken = jwt.sign({ userId, nama, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({ userId, nama, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await User.updateOne({_id: userId}, {token: refreshToken});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Email Tidak Ditemukan" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.find({
        'token': refreshToken
    });
    if(!user) return res.sendStatus(204);
    const userId = user.id;
    await User.updateOne({_id: userId}, {token: null});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}