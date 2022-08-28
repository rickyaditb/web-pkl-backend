import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
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
        required: true
    }
});

export default mongoose.model('User', UserSchema);