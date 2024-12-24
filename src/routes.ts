import {Router} from "express";
import * as BookController from "./controllers/book-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);
router.get("/books/:guid", BookController.getBookById);

router.delete("/books/:guid", BookController.deleteBookById);

router.post("/books", BookController.postBook);

router.patch("/books/:guid", BookController.updateBook);

export default router;