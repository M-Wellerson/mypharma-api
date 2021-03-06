import express from "express";
import categoryController from "./../controller/categoryController.js";
import productController from "./../controller/productController.js";
import brandController from "./../controller/brandController.js";
import User from "../database/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import validateJwt from "../middleware/validateJwt.js";
import cors from "cors";

const routes = express.Router();

routes.use(cors())
routes.post('/categoria', validateJwt, async (req, res) => {
    const category = new categoryController(req.body);
    await category.create();
    return res.status(200).json({ message: "Criado com sucesso!" });
});

routes.get("/categoria/:id", validateJwt, async (req, res) => {
    const category = new categoryController(req.body);
    const search = await category.getOne();

    return res.status(200).send(search);
});

routes.get("/categoria", validateJwt, async (req, res) => {
    const category = new categoryController(req.body);
    let search = await category.getMany();

    return res.status(200).send(search);
});

routes.put("/categoria/:id", validateJwt, async (req, res) => {
    const category = new categoryController(req.params);
    const update = await category.update();

    return res.status(200).send(update);
});

routes.delete("/categoria/:id", validateJwt, async (req, res) => {
    const category = new categoryController(req.params);
    await category.delete();

    return res.status(200).send({ message: "Apagado com sucesso!" });
});

//Product Routers

routes.post('/produto', validateJwt, async (req, res) => {
    const product = new productController(req.body);
    await product.create();
    return res.status(200).json({ message: "Criado com sucesso!" });
});

routes.get("/produto/:id", validateJwt, async (req, res) => {
    const product = new productController(req.body);
    const search = await product.getOne();

    return res.status(200).send(search);
});

routes.get("/produto", validateJwt, async (req, res) => {
    const product = new productController(req.body);
    let search = await product.getMany();

    return res.status(200).send(search);
});

routes.put("/produto/:id", validateJwt, async (req, res) => {
    const product = new productController(req.params);
    const update = await product.update();

    return res.status(200).send(update);
});

routes.delete("/produto/:id", validateJwt, async (req, res) => {
    const product = new productController(req.params);
    await product.delete();

    return res.status(200).send({ message: "Apagado com sucesso!" });
});

//Brand Routers

routes.post('/marca', validateJwt, async (req, res) => {
    const brand = new brandController(req.body);
    await brand.create();
    return res.status(200).json({ message: "Criado com sucesso!" });
});

routes.get("/marca/:id", validateJwt, async (req, res) => {
    const brand = new brandController(req.body);
    const search = await brand.getOne();

    return res.status(200).send(search);
});

routes.get("/marca", validateJwt, async (req, res) => {
    const brand = new brandController(req.body);
    let search = await brand.getMany();

    return res.status(200).send(search);
});

routes.put("/marca/:id", validateJwt, async (req, res) => {
    const brand = new brandController(req.params);
    const update = await brand.update();

    return res.status(200).send(update);
});

routes.delete("/marca/:id", validateJwt, async (req, res) => {
    const brand = new brandController(req.params);
    await brand.delete();

    return res.status(200).send({ message: "Apagado com sucesso!" });
});

routes.post("/cadastro", async (req, res) => {
    try {
        const { email, senha, nome } = req.body;

        if (!email || !senha || !nome) {
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Conta j?? existe com esse e-mail!" });
        }

        const newUser = new User({
            email: email,
            senha: senha,
            nome: nome,
        });
        const token = jsonwebtoken.sign({ data: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await newUser.save();
        res.json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                nome: newUser.nome,
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// login route setup
routes.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        const user = await User.findOne({ email: email }).select("senha");
        if (!user) {
            return res
                .status(400)
                .json({ message: "Credenciais inv??lidas" });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciais inv??lidas" });
        }

        const token = jsonwebtoken.sign({ data: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                nome: user.nome,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default routes;