import { Request, Response } from "express";
import * as BookService from "../services/books-services";
import { BookModel } from "../models/book-model";
    
export const getAllBooks = async (req: Request, res: Response) => {
    const httpResponse = await BookService.getAllBooksService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookById = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.getBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteBookById = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.deleteBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const postBook = async (req: Request, res: Response) => {
    const bodyValue = req.body;
    const httpResponse = await BookService.insertBookService(bodyValue);

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
}

//patch
export const updateBook = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();
    const bodyValue: BookModel = req.body;

    const httpResponse = await BookService.updateBookService(guid, bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}