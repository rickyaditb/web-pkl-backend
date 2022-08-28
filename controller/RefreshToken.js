import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.find({
            'token': refreshToken
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const nama = user.nama;
            const email = user.email;

            const accessToken = jwt.sign({userId, nama, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}