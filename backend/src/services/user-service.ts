import { HttpResponseModel } from "../models/http-response-model";
import { UserModel } from "../models/user-model";
import * as UserRepository from "../repositories/user-repository"
import * as httpResponse from "../utils/http-helper";
import validator from 'validator';


export const insertUserService = async (user: UserModel): Promise<HttpResponseModel> => {
    let response = null;

    const isEmail = validator.isEmail(user.email);

    if (!isEmail) {
        response = await httpResponse.badRequest("Insira um email válido!");
        return response;
    }

    const hasCreated = await  UserRepository.insertUserRepository(user);

    if (hasCreated === true) {
        response = await httpResponse.created();
    }
    else {
        response = await httpResponse.badRequest("Não foi possível criar o usuário!");
    }
    return response;
}