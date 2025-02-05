import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { UpdateBookByGuidService } from "../services/book/update-book-by-guid/update-book-by-guid-service";

export function makeUpdateBookByGuidService() {
    const booksRepository = new SQLBooksRepository();
    const updateBookByGuidService = new UpdateBookByGuidService(booksRepository);

    return updateBookByGuidService;
}