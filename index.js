import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import LaporanRoute from "./routes/LaporanRoute.js";
import PresensiRoute from "./routes/PresensiRoute.js";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_CRED,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

app.use(LaporanRoute);
app.use(PresensiRoute);
app.use(UserRoute);

app.listen(5000, ()=> console.log("Server Berjalan"));
