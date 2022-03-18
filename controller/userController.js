import User from "../database/User.js";
import bcrypt from "bcrypt";

export default class userController {
    constructor(resquet) {
        this.user = resquet;
    }
    async create() {
        return await User.create({
            nome: this.user.nome,
            descricao: this.user.descricao,
        })
    }

    async update() {
        return await User.updateOne({ id: this.user.id }, {
            nome: this.user.nome,
            descricao: this.user.descricao,
            updateAt: Date.now()
        });
    }

    async delete() {
        return await User.deleteOne({ id: this.user.id }, function (err) {
            if (err) return err;
            console.log("Successful deletion");
        });
    }

    async login() {
        const user = await User.findOne({ email: this.user.email })
        try {
            if (await bcrypt.compare(this.user.senha, user.senha)) {
                res.redirect('/')
            } else {
                console.log('Not Allowed')
            }
        } catch (e) {
            return e;
        }
    }

    verityToken() {
        const token = this.user['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }