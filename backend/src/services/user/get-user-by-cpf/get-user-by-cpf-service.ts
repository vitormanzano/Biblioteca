import { IUsersRepository } from "backend/src/repositories/models-repository/user-repository-interface";
import { HttpResponseModel } from "../../../models/http-response-model";
import * as httpResponse from "../../../utils/http-helper";
import { isValidCPF } from "../../../validators/VerifyCpf";

export class GetUserByCpfService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(cpf: string): Promise<HttpResponseModel> {
        cpf = cpf.trim();

        let response = null;

        await isValidCPF(cpf);

        const searchedUser = await this.usersRepository.getUserByCpf(cpf);

        if (searchedUser) {
            response = await httpResponse.ok(searchedUser);
        }

        else {
            response = await httpResponse.notFound("Usuário não encontrado!");
        }
        return response;
    }
}