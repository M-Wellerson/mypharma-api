import mongoose from "mongoose";
import { randomUUID } from 'crypto'

const brandSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: randomUUID()
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updateAt: {
        type: Date,
        default: () => Date.now()
    },
});

export default mongoose.model("Brand", brandSchema);