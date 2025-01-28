import { HttpResponseModel } from "../models/http-response-model";
import { UserModel } from "../models/user-model";
import * as UserRepository from "../repositories/user-repository"
import * as httpResponse from "../utils/http-helper";
import { isValidCPF } from "../validators/VerifyCpf";
import { isValidEmail } from "../validators/verifyEmail";

export const insertUserService = async (user: UserModel): Promise<HttpResponseModel> => {
    removeBlankSpacesFromReq([user.cpf, user.email, user.nome, user.senha]);

    let response = null;

    isValidCPF(user.cpf);

    isValidEmail(user.email);

    user.nome = user.nome[0].toUpperCase();

    const hasCreated = await  UserRepository.insertUser(user);

    if (hasCreated === true) {
        response = await httpResponse.created();
    }
    else {
        response = await httpResponse.badRequest("Não foi possível criar o usuário!");
    }
    return response;
}

export const getAllUsersService = async (): Promise<HttpResponseModel> => {
    let response = null;

    const allUsers = await UserRepository.getAllUsers();

    if (!allUsers) {
        response = await httpResponse.notFound({message: "Nenhum usuário encontrado"});
    }

    else {
        response = await httpResponse.ok(allUsers);
    }
    return response;
}

export const getUserByCpfService = async (cpf: string): Promise<HttpResponseModel> => {
    cpf = cpf.trim();

    let response = null;

    isValidCPF(cpf);

    const searchedUser = await UserRepository.getUserByCpf(cpf);

    if (searchedUser) {
        response = await httpResponse.ok(searchedUser);
    }

    else {
        response = await httpResponse.notFound("Usuário não encontrado!");
    }
    return response;
}

export const deleteUserByCpfService = async (cpf: string): Promise<HttpResponseModel> => {
    cpf = cpf.trim();

    let response = null;

    const hasDeletedUser = await UserRepository.deleteUserByCpf(cpf);

    isValidCPF(cpf); 

    if (!hasDeletedUser) {
        response = await httpResponse.badRequest({message: "Não foi possível deletar o usuário"});
    }
    else {
        response = await httpResponse.ok({message: "Usuário deletado com sucesos!"});
    }
    return response
}

export async function removeBlankSpacesFromReq(fields: string[]): Promise<void> {
    for (let field in fields) {
        field.trim();
    }

}