import { Request, Response } from "express";
import * as BookService from "../services/books-services";

export const getAllBooks = async (req: Request, res: Response) => {
    const response = await BookService.getAllBooks();
    res.status(response.statusCode).json(response.body);
}