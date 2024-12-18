import {Router} from "express";
import * as BookController from "./controllers/book-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);
router.get("/books/:id", BookController.getBookById);

router.delete("/books/:id", BookController.deleteBookById);

router.post("/books", BookController.postBook);

router.patch("/books/:id", BookController.updateBook);

export default router;