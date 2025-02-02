import { hash } from "bcrypt";
import { HttpResponseModel } from "../../../models/http-response-model";
import { UserModel } from "../../../models/user-model";
import { isValidCPF } from "../../../validators/VerifyCpf";
import { isValidEmail } from "../../../validators/verifyEmail";
import * as httpResponse from "../../../utils/http-helper";
import { IUsersRepository } from "../../../repositories/models-repository/user-repository-interface";
import { removeBlankSpacesFromReq } from "backend/src/utils/removeBlankSpacesFromReq";

export class InsertUserService {
    constructor (private usersRepository: IUsersRepository) {}

    async execute(user: UserModel): Promise<HttpResponseModel> {

        await removeBlankSpacesFromReq([user.cpf, user.email, user.nome, user.senha]);

        await isValidCPF(user.cpf);
        
        isValidEmail(user.email);

        user.nome = user.nome[0].toUpperCase();

        let response = null;

        user.senha = await hash(user.senha, 6);

        const hasCreated = await this.usersRepository.insertUser(user);
        

        if (hasCreated === true) {
            response = await httpResponse.created();
        }
        else {
            response = await httpResponse.badRequest("Não foi possível criar o usuário!");
        }
        
        return response;
    }
}
