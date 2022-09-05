import mongoose from "mongoose";
import Schema from "mongoose";

const LaporanSchema = mongoose.Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    nama_user: {
        type: String,
        required: false
    },
    tanggal_laporan: {
        type: Date,
        required: true
    },
    isi_laporan: {
        type: String,
        required: true
    }
});

export default mongoose.model('Laporan', LaporanSchema);