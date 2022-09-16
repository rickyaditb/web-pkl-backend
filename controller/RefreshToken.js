import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const refreshToken = async(req, res) => {
    const hari_ini = moment();
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.find({
            'token': refreshToken
        }).populate('pembimbing');
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0]._id;
            const nama = user[0].nama;
            const email = user[0].email;
            const telepon = user[0].telepon;
            const instansi = user[0].asal_instansi;
            const role = user[0].role;
            const tanggal_mulai = user[0].tanggal_mulai;
            const tanggal_selesai = user[0].tanggal_selesai;
            const pembimbing = user[0].pembimbing;
            const gambar = user[0].gambar;
            const status = (hari_ini > tanggal_mulai && hari_ini < tanggal_selesai) ? "Aktif" : "Non Aktif"
            const accessToken = jwt.sign({userId, nama, email, telepon, instansi, role, tanggal_mulai, tanggal_selesai, status, pembimbing, gambar}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}