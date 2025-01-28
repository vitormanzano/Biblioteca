import {Request, Response} from "express";
import { UserModel } from "../models/user-model";
import * as HttpResponse from "../utils/http-helper";
import * as UserService from "../services/user-service";
import { HttpResponseModel } from "../models/http-response-model";
import {haveAllTheUserParameters } from "../validators/verifyTheParameters";

export const postUser  = async (req: Request, res: Response) => {
    const user = req.body as UserModel;
    let httpResponse: HttpResponseModel

    const hasAllTheParameters = haveAllTheUserParameters(user);
    
    if (!hasAllTheParameters) {
        httpResponse = await HttpResponse.badRequest({ message: "Faltam parâmetros"});
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
    
    //Estou com receio de misturar isso, retornar um HttpResponse no controller, sendo que esse papel, em todos estava sendo unicamente do service!
    if (!cpf) {
        httpResponse = await HttpResponse.badRequest({message: "Insira um cpf!"});
    }
    else {
        httpResponse = await UserService.getUserByCpfService(cpf);
    }

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const deleteUserByCpf = async (req: Request, res: Response) => {
    const cpf = req.params.cpf.toString();
    let httpResponse = null;

    if (!cpf) {
        httpResponse = await HttpResponse.badRequest({message: "Insira um cpf!"});
    }
    else {
        httpResponse = await UserService.deleteUserByCpfService(cpf);
    }
    res.status(httpResponse.statusCode).json(httpResponse.body);
}