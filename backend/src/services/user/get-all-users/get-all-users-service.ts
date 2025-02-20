import { IUsersRepository } from "backend/src/repositories/models/user-repository-interface";
import { HttpResponseModel } from "../../../models/http-response-model";
import * as httpResponse from "../../../utils/http-helper";

export class GetAllUsersService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(): Promise<HttpResponseModel> {
        let response = null;

        const allUsers = await this.usersRepository.getAllUsers();

        if (!allUsers) {
            response = await httpResponse.notFound({message: "Nenhum usuário encontrado"});
        }

        else {
            response = await httpResponse.ok(allUsers);
        }
        return response;
    }
}