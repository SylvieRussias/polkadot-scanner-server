import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Server } from "http";
import { errorHandler } from "./config/errorHandler";
import { authenticator } from "./config/authenticator";
import { json, urlEncodedNotExtended } from "./config/bodyParser";
import path from "path";

dotenv.config();
const app = configure(express());
serveStaticWebapp(app);
startServer(app);

function configure(app: express.Express): express.Express {
    app.use(cors());
    app.use(urlEncodedNotExtended());
    app.use(json());
    app.use(authenticator());
    app.use(errorHandler);
    return app;
}

function serveStaticWebapp(app: express.Express) {
    app.use(express.static(path.join(__dirname, "polkadot-scanner-frontend")));
}

function startServer(app: express.Express): Server {
    const serverPort = process.env.NODE_ENV === "development" ? 4000 : 80;
    return app.listen(serverPort, () => {
        console.log("Server listening on port " + serverPort);
    });
}
