import { HttpResponse } from "../models/http-response-model";
import * as BookRepository from "../repositories/books-repository";
import * as httpResponse from "../utils/http-helper"

export const getAllBooksService = async (): Promise<HttpResponse> => {
    const data = await BookRepository.findAllBooks();

    const response = httpResponse.ok(data);
    return response;
}

export const getBookByIdService = async (id: number): Promise<HttpResponse> => {
    const data = await BookRepository.findBookById(id);
    let response = null

    if (data) {
        response = httpResponse.ok(data);
    }
    else {
        response = httpResponse.noContent();
    }
    return response;
}