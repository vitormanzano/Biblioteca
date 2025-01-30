import { SQLUsersRepository } from "../repositories/SQL/SQL-user-repository";
import { DeleteUserByCpfService } from "../services/user/delete-user-by-cpf/delete-user-by-cpf-service";

export function makeDeleteUserByCpfService() {
    const usersRepository = new SQLUsersRepository();
    const deleteUserByCpfService = new DeleteUserByCpfService(usersRepository);

    return deleteUserByCpfService;
}