import { json, Request, Response } from "express";
import * as BookService from "../services/books-services";

export const getAllBooks = async (req: Request, res: Response) => {
    const httpResponse = await BookService.getAllBooksService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const httpResponse = await BookService.getBookByIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteBookById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const httpResponse = await BookService.deleteBookByIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}