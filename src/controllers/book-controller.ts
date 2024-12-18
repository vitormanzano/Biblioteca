import { Request, Response } from "express";
import * as BookService from "../services/books-services";

export const getAllBooks = async (req: Request, res: Response) => {
    const httpResponse = await BookService.getAllBooksService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const httpResponse = await BookService.getBookByIdService(id);
    console.log(httpResponse.body);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}