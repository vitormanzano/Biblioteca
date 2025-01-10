import {Router} from "express";
import * as BookController from "./controllers/book-controller";
import * as UserController from "./controllers/user-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);
router.get("/books/:guid", BookController.getBookByGuid);
router.get("/books/search/:title", BookController.getBooksByName);

router.delete("/books/:guid", BookController.deleteBookByGuid);

router.post("/books", BookController.postBook);

router.patch("/books/:guid", BookController.updateBookByGuid);

//Rotas do usuário

router.post("/user", UserController.postUser);

export default router;