import { Request, Response } from "express";
import * as BookService from "../services/book-services";
import { BookModel } from "../models/book-model";
import * as HttpResponse from "../utils/http-helper"    

export const getAllBooks = async (req: Request, res: Response) => {
    const httpResponse = await BookService.getAllBooksService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.getBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBooksByTitle = async (req: Request, res: Response) => {
    const title = (req.params.title).toString();

    const httpResponse = await BookService.getBooksByNameService(title);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const httpResponse = await BookService.deleteBookByGuidService(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const postBook = async (req: Request, res: Response) => {
    const book = req.body as BookModel;
    let httpResponse = null;

    if (!book.autor || !book.titulo || !book.paginas) {
        httpResponse = await HttpResponse.badRequest({ message: "Faltam parâmetros"});
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else {
        httpResponse = await BookService.insertBookService(book);
    }
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

//patch
export const updateBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();
    const bodyValue: BookModel = req.body;

    const httpResponse = await BookService.updateBookByGuidService(guid, bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}