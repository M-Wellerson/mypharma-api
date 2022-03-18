import category from "../database/Category.js";

export default class categoryController {
    constructor(resquet) {
        this.category = resquet;
    }
    async create() {
        return await category.create({
            nome: this.category.nome,
            descricao: this.category.descricao,
        })
    }

    async update() {
        return await category.updateOne({ id: this.category.id }, {
            nome: this.category.nome,
            descricao: this.category.descricao,
            updateAt: Date.now()
        });
    }

    async delete() {
        return await category.deleteOne({ id: this.category.id }, function (err) {
            if (err) return err;
            console.log("Successful deletion");
        });
    }

    async getOne() {
        return await category.findOne({ id: this.category.id });
    }

    async getMany() {
        return await category.find();
    }
}