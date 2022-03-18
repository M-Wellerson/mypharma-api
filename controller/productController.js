import Product from "../database/Product.js";

export default class categoryController {
    constructor(resquet) {
        this.product = resquet;
    }
    async create() {
        return await Product.create({
            nome: this.product.nome,
            descricao: this.product.descricao,
            preco: this.product.preco,
            estoque: this.product.estoque,
            categoria: this.product.categoria,
            marca: this.product.marca
        })
    }

    async update() {
        return await Product.updateOne({ id: this.product.id }, {
            nome: this.product.nome,
            descricao: this.product.descricao,
            preco: this.product.preco,
            estoque: this.product.estoque,
            categoria: this.product.categoria,
            marca: this.product.marca,
            updateAt: Date.now()
        });
    }

    async delete() {
        return await Product.deleteOne({ id: this.product.id }, function (err) {
            if (err) return err;
            console.log("Successful deletion");
        });
    }

    async getOne() {
        return await Product.findOne({ id: this.product.id });
    }

    async getMany() {
        return await Product.find({ $or: [{ id: this.product.id }, { nome: this.product.nome }] });
    }
}