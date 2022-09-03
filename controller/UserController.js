import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const user = await User.find().select(['_id', 'email', 'nama', 'asal_instansi', 'role', 'tanggal_mulai', 'tanggal_selesai', 'absensi']);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const registerUser = async (req, res) => {
    const { email, nama, asal_instansi, role, tanggal_mulai, tanggal_selesai, password, confPassword } = req.body;

    const cekUser = await User.findOne({
        'email': req.body.email
    })

    if(cekUser) return res.status(400).json({ message: "Email yang sudah anda pakai sudah terdaftar!" });

    if (password !== confPassword) return res.status(400).json({ message: "Password dan Konfirmasi Password Tidak Sesuai" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        email: email,
        nama: nama,
        asal_instansi: asal_instansi,
        role: role,
        tanggal_mulai: tanggal_mulai,
        tanggal_selesai: tanggal_selesai,
        password: hashPassword,
    })

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
        if (!match) return res.status(400).json({ message: "Password Salah" });
        const userId = user.id;
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