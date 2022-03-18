import 'dotenv/config'
import express from 'express';
import app from "./../routes/web.js";

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(app);
    }
}

export default new AppController().express;