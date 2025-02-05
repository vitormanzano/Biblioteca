import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { GetBookByGuidService } from "../services/book/get-book-by-guid/get-book-by-guid-service";

export function makeGetBookByGuidService() {
    const booksRepository = new SQLBooksRepository();
    const getBookByGuidService = new GetBookByGuidService(booksRepository);

    return getBookByGuidService;
}