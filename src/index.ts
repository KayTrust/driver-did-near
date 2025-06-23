import * as bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import logger from "./logger";

import Routes from "./routes";

dotenv.config();
const port = process.env.PORT || 3000;

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.send("Welcome to driver for did:near");
        });

        this.express.use("/1.0", Routes);

        this.express.listen(port, () => {
          logger.info(`Server is running at http://localhost:${port}`);
        });
    }
}

export default new App().express;