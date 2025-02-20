import { Request, Response } from "express";
import { BookModel } from "../models/book-model";
import * as HttpResponse from "../utils/http-helper" 
import { makeDeleteBookByGuidService } from "../factories/make-delete-book-by-guid-service";
import { makeGetAllBooksService } from "../factories/make-get-all-books-service";
import { makeGetBookByGuidService } from "../factories/make-get-book-by-guid-service";
import { makeGetBooksByTitleService } from "../factories/make-get-books-by-title-service";
import { makePostBookService } from "../factories/make-post-book-service";
import { makeUpdateBookByGuidService } from "../factories/make-update-book-by-guid-service";

export const getAllBooks = async (req: Request, res: Response) => {
    const getAllBooksService = makeGetAllBooksService();

    const httpResponse = await getAllBooksService.execute();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();
    const getBookByGuidService = makeGetBookByGuidService();

    const httpResponse = await getBookByGuidService.execute(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getBooksByTitle = async (req: Request, res: Response) => {
    const title = (req.params.title).toString();
    const getBooksByTitleService = makeGetBooksByTitleService();

    const httpResponse = await getBooksByTitleService.execute(title);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();

    const deleteBookByGuidService = makeDeleteBookByGuidService();

    const httpResponse = await deleteBookByGuidService.execute(guid);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const postBook = async (req: Request, res: Response) => {
    const book = req.body as BookModel;
    let httpResponse = null;

    const postBookService = makePostBookService();

    if (!book.autor || !book.titulo || !book.paginas) {
        httpResponse = await HttpResponse.badRequest({ message: "Faltam parâmetros"});
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else {
        httpResponse = await postBookService.execute(book);
    }
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

//patch
export const updateBookByGuid = async (req: Request, res: Response) => {
    const guid = (req.params.guid).toString();
    const bodyValue: BookModel = req.body;

    const updateBookByGuidService = makeUpdateBookByGuidService()

    const httpResponse = await updateBookByGuidService.execute(guid, bodyValue);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}