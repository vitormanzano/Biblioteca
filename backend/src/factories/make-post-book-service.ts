import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { PostBookService } from "../services/book/post-books/post-book-service";

export function makePostBookService() {
    const booksRepository = new SQLBooksRepository();
    const postBookService = new PostBookService(booksRepository);

    return postBookService;
}