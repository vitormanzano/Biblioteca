import * as BookRepository from "../repositories/books-repository";
import * as HttpResponse from "../utils/http-helper"

export const getAllBooks = async () => {
    const data = await BookRepository.findAllBooks();

    const response = HttpResponse.ok(data);
    return response;
}