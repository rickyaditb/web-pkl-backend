import mongoose from "mongoose";
import Schema from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    telepon: {
        type: String,
        required: false
    },
    nama: {
        type: String,
        required: true
    },
    asal_instansi: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    tanggal_mulai: {
        type: Date,
        required: false
    },
    tanggal_selesai: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    absensi: [{
        type: Schema.Types.ObjectId,
        ref: "Presensi"
    }],
    laporan: [{
        type: Schema.Types.ObjectId,
        ref: "Laporan"
    }],
    pembimbing: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model('User', UserSchema);