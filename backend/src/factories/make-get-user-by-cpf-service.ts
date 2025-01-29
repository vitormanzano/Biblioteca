import { SQLUsersRepository } from "../repositories/user-repository";
import { GetUserByCpfService } from "../services/user/get-user-by-cpf/get-user-by-cpf-service";

export function makeGetUserByCpfService() {
    const usersRepository = new SQLUsersRepository();
    const getUserByCpfService = new GetUserByCpfService(usersRepository);

    return getUserByCpfService;
}