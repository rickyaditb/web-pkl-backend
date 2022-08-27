import mongoose from "mongoose";

const PresensiSchema = mongoose.Schema({
    id_user: {
        type: String,
        required: false
    },
    nama_user: {
        type: String,
        required: false
    },
    waktu_absensi: {
        type: Date,
        required: true
    },
    keterangan: {
        type: String,
        required: true
    }
});

export default mongoose.model('Presensi', PresensiSchema);