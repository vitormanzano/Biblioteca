import { Request, Response } from "express";
import { UserModel } from "../models/user-model";
import * as HttpResponse from "../utils/http-helper";
import * as UserService from "../services/user-service";
import { HttpResponseModel } from "../models/http-response-model";
import { haveAllTheUserParameters } from "../validators/verifyTheParameters";

export const postUser = async (req: Request, res: Response) => {
    const user = req.body as UserModel;
    let httpResponse: HttpResponseModel

    const hasAllTheParameters = haveAllTheUserParameters(user);

    if (!hasAllTheParameters) {
        httpResponse = await HttpResponse.badRequest({ message: "Faltam parâmetros" });
    }

    else {
        httpResponse = await UserService.insertUserService(user);
    }

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getAllUsers = async (req: Request, res: Response) => {
    let httpResponse = await UserService.getAllUsersService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

    try {
        httpResponse = await UserService.getUserByCpfService(cpf);
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } 
    catch (error: any) {
        res.status(500).json(error.message);
    }
}

export const deleteUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

    try {
        httpResponse = await UserService.deleteUserByCpfService(cpf);
    }
    catch (error: any) {
        httpResponse = await HttpResponse.serverError(error.message);
    }
    finally {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
}