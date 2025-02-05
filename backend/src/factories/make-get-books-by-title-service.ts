import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { GetBookByTitleService } from "../services/book/get-books-by-title/get-books-by-title-service";

export function makeGetBooksByTitleService() {
    const booksRepository = new SQLBooksRepository();
    const getBookByTitleservice = new GetBookByTitleService(booksRepository);

    return getBookByTitleservice;
}