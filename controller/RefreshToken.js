import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log(req.cookies);
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.find({
            'token': refreshToken
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const nama = user[0].nama;
            const email = user[0].email;
            const instansi = user[0].asal_instansi;
            const role = user[0].role;
            const tanggal_mulai = user[0].tanggal_mulai;
            const tanggal_selesai = user[0].tanggal_selesai;

            const accessToken = jwt.sign({userId, nama, email, instansi, role, tanggal_mulai, tanggal_selesai}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}