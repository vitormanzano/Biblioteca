import { Request, Response } from "express";
import * as BookService from "../services/books-services";
import { BookModel } from "../models/book-model";
    
export const getAllBooks = async (req: Request, res: Response) => {
    const httpResponse = await BookService.getAllBooksService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.getBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.deleteBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const postBook = async (req: Request, res: Response) => {
    const bodyValue = req.body;
    const httpResponse = await BookService.insertBookService(bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

//patch
export const updateBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();
    const bodyValue: BookModel = req.body;

    const httpResponse = await BookService.updateBookByGuidService(guid, bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}