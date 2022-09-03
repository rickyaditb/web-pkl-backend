import mongoose from "mongoose";
import Schema from "mongoose";

const PresensiSchema = mongoose.Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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