import {Request, Response} from "express";
import { UserModel } from "../models/user-model";
import * as HttpResponse from "../utils/http-helper";
import * as UserService from "../services/user-service";


export const postUser  = async (req: Request, res: Response) => {
    const user = req.body as UserModel;
    let httpResponse = null;

    if (!user.cpf || !user.email || !user.nome || !user.senha) {
        httpResponse = await HttpResponse.badRequest({message: "Faltam parâmetros"});
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    
    httpResponse = await UserService.insertUserService(user);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}