import { Request, Response } from "express";
import { UserModel } from "../models/user-model";
import * as HttpResponse from "../utils/http-helper";
import { haveAllTheUserParameters } from "../validators/verifyTheParameters";
import { makeInsertUserService } from "../factories/make-insert-user-service";
import { makeDeleteUserByCpfService } from "../factories/make-delete-user-by-cpf-service";
import { makeGetUserByCpfService } from "../factories/make-get-user-by-cpf-service";
import { makeGetAllUsersService } from "../factories/make-get-all-users-service";
import { IUserSigninModel } from "../models/user-signIn-model";
import { makeSignInUser } from "../factories/make-sign-in-user";

export const postUser = async (req: Request, res: Response) => {
    const user = req.body as UserModel;
    let httpResponse = null;

    const hasAllTheParameters = haveAllTheUserParameters(user);

    try {
        const insertUserService = makeInsertUserService();

        if (!hasAllTheParameters) {
            httpResponse = await HttpResponse.badRequest({ message: "Faltam parâmetros" });
        }
    
        else {
            httpResponse = await insertUserService.execute(user);
        }
    }

    catch (error) {
        console.log(error);
    }

    res.status(httpResponse!.statusCode).json(httpResponse!.body);
}

export const getAllUsers = async (req: Request, res: Response) => {
    const getAllUsersService = makeGetAllUsersService();
    let httpResponse = null;

    try {
        httpResponse = await getAllUsersService.execute();
    }
    catch (error) {
        httpResponse = await HttpResponse.badRequest(error);
    }

    
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

    const token = req.session.token;

    if (token === undefined || token === null ) {
        httpResponse = await HttpResponse.badRequest("Usuário precisa fazer login!");
    }

    const getUserByCpfService = makeGetUserByCpfService();

    try {
        httpResponse = await getUserByCpfService.execute(cpf);
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } 
    catch (error: any) {
        res.status(500).json(error.message);
    }
}

export const deleteUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

    const token = req.session.token;

    if (token === undefined || token === null ) {
        httpResponse = await HttpResponse.badRequest("Usuário precisa fazer login!");
    }

    const deleteUserByCpfService = makeDeleteUserByCpfService();

    try {
        httpResponse = await deleteUserByCpfService.execute(cpf);
    }
    catch (error: any) {
        httpResponse = await HttpResponse.serverError(error.message);
    }
    finally {
        res.status(httpResponse!.statusCode).json(httpResponse!.body);
    }
}

export const signInUser = async (req: Request, res: Response) => {
    const signInData = req.body as IUserSigninModel;
    let httpResponse = null;

    const signInUsersService = makeSignInUser();

    try {
        httpResponse = await signInUsersService.execute(signInData);
        req.session.token = "1234";
    }
    catch (error: any) {
        httpResponse = await HttpResponse.serverError(error.message);
    }
    res.status(httpResponse.statusCode).json(httpResponse.body);
}