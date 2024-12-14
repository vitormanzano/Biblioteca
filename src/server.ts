import express, {Router} from "express";

const port = process.env.PORT
const app = express();
const router = Router();

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
})