import dotenv from 'dotenv';
import express from "express";
import logger from "../logger";

import * as NearResolver from '@kaytrust/did-near-resolver';
import { Resolver } from 'did-resolver';

dotenv.config();

type IdentifierOptions = {
    contract_id: string,
    rpc_url: string,
    network_id: string,
}

class Identifiers {

    public express: express.Application;
    private options: IdentifierOptions= { 
        contract_id: "",
        rpc_url: "",
        network_id: "",
    };

    constructor() {
        this.express = express();
        this.loadOptions();
        this.routes();
    }

    private loadOptions(): void {
        this.options.contract_id = process.env.CONTRACT_ID || "";
        this.options.rpc_url = process.env.RPC_URL || "https://rpc.testnet.near.org";
        this.options.network_id = process.env.NETWORK_ID || "testnet";

        if (!this.options.contract_id) logger.warn("CONTRACT_ID is required but was not provided. Set the environment variable to your DID registry contract address.");
    }

    private routes(): void {

        this.express.get("/identifiers/:identifier", async (req, res, next) => {
            const { params } = req;
            if (!params?.identifier) {
                res.status(400).send("Params not contains did");
                return;
            }
            const nearResolver = NearResolver.getResolver(this.options.contract_id, this.options.rpc_url, this.options.network_id);
            const resolver = new Resolver(nearResolver);
            try {
                const didDocument: any = await resolver.resolve(params.identifier);
                logger.info(`Resolve did: ${params.identifier} - ${JSON.stringify(didDocument)}`);
                res.status(200).json(didDocument);
            } catch (error: any) {
                const responseMessage = `Can't resolve did: ${params.identifier}`;
                logger.error(`${responseMessage} - ${error.message}`);
                res.status(500).json(responseMessage);
            }
        });
    }
}

export default new Identifiers().express;