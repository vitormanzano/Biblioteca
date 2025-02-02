import express from "express";
import router from "./routes";
import session from "express-session";
import { SessionSettings } from "./utils/create-sessions-settings";

function createApp() {
    const app = express();

    app.use(session(SessionSettings));
    
    app.use(express.json());

    app.use("/api", router);

    return app;
}
export default createApp;