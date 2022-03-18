import express from "express";
import categoryController from "./../controller/categoryController.js";

const routes = express.Router();

routes.post('/categoria', async (req, res) => {
    const category = new categoryController(req.body);
    await category.create();
    return res.status(200).json({ message: "Criado com sucesso!" });
});

routes.get("/categoria/:id", async (req, res) => {
    const category = new categoryController(req.body);
    const search = await category.getOne();

    return res.status(200).send(search);
})

routes.get("/categoria", async (req, res) => {
    const category = new categoryController(req.body);
    let search = await category.getMany();

    return res.status(200).send(search);
})

routes.put("/categoria/:id", async (req, res) => {
    const category = new categoryController(req.body);
    const update = await category.update();
  
    return res.status(200).send(update);
  })

export default routes;