import { SQLUsersRepository } from "../repositories/user-repository";
import { InsertUserService } from "../services/user/insert-user/insert-user-service";

export function makeInsertUserService() {
    const usersRepository = new SQLUsersRepository();
    const insertUserService = new InsertUserService(usersRepository);

    return insertUserService;
}