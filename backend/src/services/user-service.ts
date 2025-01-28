import { HttpResponseModel } from "../models/http-response-model";
import { UserModel } from "../models/user-model";
import * as UserRepository from "../repositories/user-repository"
import * as httpResponse from "../utils/http-helper";
import validator from 'validator';
import { verifyCpfLength } from "../validators/verifyLengthCpf";

export const insertUserService = async (user: UserModel): Promise<HttpResponseModel> => {
    user.cpf = user.cpf.trim();
    user.email = user.email.trim();
    user.nome = user.nome.trim();
    user.senha = user.senha.trim();

    let response = null;

    const isEmail = validator.isEmail(user.email);

    if (!isEmail) {
        response = await httpResponse.badRequest("Insira um email válido!");
        return response;
    }

    const isCpfValid = await verifyCpfLength(user.cpf);

    if (!isCpfValid ) {
        response = await httpResponse.badRequest("Insira um cpf válido!");
        return response;
    }

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

    const cpfIsValid = await verifyCpfLength(cpf);

    if (!cpfIsValid) {
        response = await httpResponse.badRequest({message: "Cpf inválido"});
        return response;
    }

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

    const cpfIsValid = await verifyCpfLength(cpf);

    if (!cpfIsValid) {
        response = await httpResponse.badRequest({message: "Cpf inválido!"});
        return response;
    }

    if (!hasDeletedUser) {
        response = await httpResponse.badRequest({message: "Não foi possível deletar o usuário"});
    }
    else {
        response = await httpResponse.ok({message: "Usuário deletado com sucesos!"});
    }
    return response
}

