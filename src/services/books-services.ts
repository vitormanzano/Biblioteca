import { BookModel } from "../models/book-model";
import { HttpResponse } from "../models/http-response-model";
import * as BookRepository from "../repositories/books-repository";
import * as httpResponse from "../utils/http-helper"

export const getAllBooksService = async (): Promise<HttpResponse> => {
    const data = await BookRepository.findAllBooks();

    const response = await httpResponse.ok(data);
    return response;
}

export const getBookByIdService = async (id: number): Promise<HttpResponse> => {
    const data = await BookRepository.findBookById(id);
    let response = null

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.noContent();
    }
    return response;
}

export const deleteBookByIdService = async (id: number): Promise<HttpResponse> => {
    const isDeleted = await BookRepository.deleteBookById(id);
    let response = null;

    if (isDeleted) {
        response = await httpResponse.ok({message: "Livro Deletado!"}); 
    }
    else {
        response = await httpResponse.BadRequest("Livro não existe");
    }
    return response;
}

export const insertBookService = async (book: BookModel) => {
    let response = null;

    const data = await BookRepository.readFileJson();
    const books: BookModel[] = JSON.parse(data);
    
    const hasId = books.findIndex(bookToFind => bookToFind.id === book.id);

    if (hasId !== -1) {
       response = await httpResponse.BadRequest("Livro com id ja existente"); 
    }

    else if (Object.keys(book).length !== 0) {
        await BookRepository.insertBook(book);
        response = await httpResponse.created();
    }
    else {
        response = await httpResponse.BadRequest("Falta paramêtros");
    }
    return response;
}

export const updateBookService = async (id: number, book: BookModel) => {
    const data = await BookRepository.findAndModifyBookById(id, book);
    let response = null;

    if (Object.keys(data).length !== 0) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.BadRequest("Falta paramêtros");
    }
    return response;
}