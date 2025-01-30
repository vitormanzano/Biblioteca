import { HttpResponseModel } from "../../../models/http-response-model";
import { IUsersRepository } from "../../../repositories/models-repository/user-repository-interface";
import * as httpResponse from "../../../utils/http-helper";
import { isValidCPF } from "../../../validators/VerifyCpf";

export class DeleteUserByCpfService {
    constructor (private usersRepository: IUsersRepository) {}

    async execute(cpf: string): Promise<HttpResponseModel> {

        cpf = cpf.trim();

        let response = null;

        const hasDeletedUser = await this.usersRepository.deleteUserByCpf(cpf);

        await isValidCPF(cpf); 

        if (!hasDeletedUser) {
            response = await httpResponse.badRequest({message: "Não foi possível deletar o usuário"});
        }
        else {
            response = await httpResponse.ok({message: "Usuário deletado com sucesos!"});
        }
        return response;
    }
}