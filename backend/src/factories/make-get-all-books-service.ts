import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { GetAllBooksService } from "../services/book/get-all-books/get-all-books-service";

export function makeGetAllBooksService() {
    const booksRepository = new SQLBooksRepository();
    const getAllBooksService = new GetAllBooksService(booksRepository);

    return getAllBooksService;
}