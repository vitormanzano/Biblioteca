import { Request, Response } from "express";
import { UserModel } from "../models/user-model";
import * as HttpResponse from "../utils/http-helper";
import { HttpResponseModel } from "../models/http-response-model";
import { haveAllTheUserParameters } from "../validators/verifyTheParameters";
import { makeInsertUserService } from "../factories/make-insert-user-service";
import { makeDeleteUserByCpfService } from "../factories/make-delete-user-by-cpf-service";
import { makeGetUserByCpfService } from "../factories/make-get-user-by-cpf-service";
import { makeGetAllUsersService } from "../factories/make-get-all-users-service";

export const postUser = async (req: Request, res: Response) => {
    const user = req.body as UserModel;
    let httpResponse: HttpResponseModel;

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
        throw new Error();
    }

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getAllUsers = async (req: Request, res: Response) => {
    const getAllUsersService = makeGetAllUsersService();

    let httpResponse = await getAllUsersService.execute();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

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