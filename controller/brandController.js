import Brand from "../database/Brand.js";

export default class brandController {
    constructor(resquet) {
        this.brand = resquet;
    }
    async create() {
        return await Brand.create({
            nome: this.brand.nome,
            descricao: this.brand.descricao,
        })
    }

    async update() {
        return await Brand.updateOne({ id: this.brand.id }, {
            nome: this.brand.nome,
            descricao: this.brand.descricao,
            updateAt: Date.now()
        });
    }

    async delete() {
        return await Brand.deleteOne({ id: this.brand.id }, function (err) {
            if (err) return err;
            console.log("Successful deletion");
        });
    }

    async getOne() {
        return await Brand.findOne({ id: this.brand.id });
    }

    async getMany() {
        return await Brand.find();
    }
}