import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import LaporanRoute from "./routes/LaporanRoute.js";
import PresensiRoute from "./routes/PresensiRoute.js"
import UserRoute from "./routes/UserRoute.js"

const app = express();
mongoose.connect('mongodb+srv://ricky2:m4r10br0s@cluster0.uekxa.mongodb.net/pkl?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());

app.use(LaporanRoute);
app.use(PresensiRoute);
app.use(UserRoute);

app.listen(5000, ()=> console.log("Server Berjalan"));
