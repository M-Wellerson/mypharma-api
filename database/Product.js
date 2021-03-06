import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
import Category from "./Category.js";
import Brand from "./Brand.js";

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    preco: {
        type: String,
        required: true
    },
    estoque: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
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

export default mongoose.model("Product", productSchema);