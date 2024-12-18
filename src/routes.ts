import {Router} from "express";
import * as BookController from "./controllers/book-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);

export default router;