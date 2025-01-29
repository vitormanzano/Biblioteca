import { SQLUsersRepository } from "../repositories/SQL-user-repository";
import { GetAllUsersService } from "../services/user/get-all-users/get-all-users-service";

export function makeGetAllUsersService() {
    const usersRepository = new SQLUsersRepository();
    const getAllUsersService = new GetAllUsersService(usersRepository);

    return getAllUsersService;
}