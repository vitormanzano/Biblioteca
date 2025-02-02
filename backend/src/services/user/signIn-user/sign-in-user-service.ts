import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IUserSigninModel } from "backend/src/models/user-signIn-model";
import { IUsersRepository } from "backend/src/repositories/models-repository/user-repository-interface";
import { removeBlankSpacesFromReq } from "backend/src/utils/removeBlankSpacesFromReq";
import * as httpResponse from "../../../utils/http-helper"
import { compare } from "bcrypt";

export class SignInUserService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(signInData: IUserSigninModel): Promise<HttpResponseModel> {
        await removeBlankSpacesFromReq([signInData.email, signInData.senha]);

        const user = await this.usersRepository.findByEmail(signInData.email);

        let response = null;

        const doesPasswordMatches = await compare(signInData.senha, user!.senha);

        if (!user) {
            response = await httpResponse.notFound("Usuário não encontrado!");
        }

        else if (!doesPasswordMatches) {
            response = await httpResponse.notFound("Email e/ou senha incorretos!");
        }

        else {
            response = await httpResponse.ok("Entrando...");
        }

        return response
    }
}