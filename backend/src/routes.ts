import {Router} from "express";
// import * as BookController from "./controllers/book-controller";
import * as UserController from "./controllers/user-controller";

const router = Router();

//Rotas de livros

// router.get("/books", BookController.getAllBooks);
// router.get("/books/:guid", BookController.getBookByGuid);
// router.get("/books/search/:title", BookController.getBooksByTitle);

// router.post("/books", BookController.postBook);

// router.patch("/books/:guid", BookController.updateBookByGuid);

// router.delete("/books/:guid", BookController.deleteBookByGuid);

//Rotas do usuário

const userBasePath = "/user"

router.get(`${userBasePath}/:cpf`, UserController.getUserByCpf);
router.get("/user", UserController.getAllUsers);

router.post("/user", UserController.postUser);
router.post("/user/signIn", UserController.signInUser);

router.delete("/user/:cpf", UserController.deleteUserByCpf);

export default router;