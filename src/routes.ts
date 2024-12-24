import {Router} from "express";
import * as BookController from "./controllers/book-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);
router.get("/books/:guid", BookController.getBookByGuid);

router.delete("/books/:guid", BookController.deleteBookByGuid);

router.post("/books", BookController.postBook);

router.patch("/books/:guid", BookController.updateBookByGuid);

export default router;