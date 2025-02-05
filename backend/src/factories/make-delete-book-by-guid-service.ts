import { SQLBooksRepository } from "../repositories/SQL/SQL-book-repository";
import { SQLUsersRepository } from "../repositories/SQL/SQL-user-repository";
import { DeleteBookByGuidService } from "../services/book/delete-book-by-guid/delete-book-by-guid-service";
import { GetAllUsersService } from "../services/user/get-all-users/get-all-users-service";

export function makeDeleteBookByGuidService() {
    const booksRepository = new SQLBooksRepository();
    const deleteBookByGuidService = new DeleteBookByGuidService(booksRepository);

    return deleteBookByGuidService;
}