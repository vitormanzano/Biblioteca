import {Router} from "express";
import * as BookController from "./controllers/book-controller";
import * as UserController from "./controllers/user-controller";

const router = Router();

//Rotas de livros

router.get("/books", BookController.getAllBooks);
router.get("/books/:guid", BookController.getBookByGuid);
router.get("/books/search/:title", BookController.getBooksByName);

router.post("/books", BookController.postBook);

router.patch("/books/:guid", BookController.updateBookByGuid);

router.delete("/books/:guid", BookController.deleteBookByGuid);



//Rotas do usuário

router.get("/user/:cpf", UserController.getUserByCpf);
router.get("/user", UserController.getAllUsers);

router.post("/user", UserController.postUser);



router.delete("/user/:cpf", UserController.deleteUserByCpf);



export default router;