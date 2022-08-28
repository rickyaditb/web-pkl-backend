import User from "../models/UserModel.js";
import bcrypt from "bcrypt"

export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const registerUser = async (req, res) => {
    const { email, nama, asal_instansi, role, tanggal_mulai, tanggal_selesai, password, confPassword, token } = req.body;

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
        token: token
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
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

    const user = new User(req.body);
    try {
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
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