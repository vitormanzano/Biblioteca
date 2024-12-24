import { BookModel } from "../models/book-model";
import { HttpResponse } from "../models/http-response-model";
import * as BookRepository from "../repositories/books-repository";
import * as httpResponse from "../utils/http-helper";

export const getAllBooksService = async (): Promise<HttpResponse> => {
    const data = await BookRepository.findAllBooks();
    let response = null;

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.noContent({message: "Nenhum livro encontrado!"});
    }
    return response;
}

export const getBookByGuidService = async (guid: string): Promise<HttpResponse> => {
    const data = await BookRepository.findBookByGuid(guid);
    let response = null

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.noContent({message: "Não foi possível achar o livro"});
    }
    return response;
}

export const deleteBookByGuidService = async (guid: string): Promise<HttpResponse> => {
    const existId = await BookRepository.findBookByGuid(guid);
    let response = null;

    if (existId === undefined) {
        response = await httpResponse.BadRequest({message: "Não foi possível achar o livro!"});
        return response
    } 

    const isDeleted = await BookRepository.deleteBookByGuid(guid);

    if (isDeleted) {
        response = await httpResponse.ok({message: "Livro Deletado!"}); 
    }
    else {
        response = await httpResponse.BadRequest("Livro não existe");
    }
    return response;
}

export const insertBookService = async (book: BookModel): Promise<HttpResponse> => {
    let response = null;
    
    const hasCreated = await BookRepository.insertBook(book);
    
    if (hasCreated === true) {  
        response = await httpResponse.created();
    }
    else {
        response = await httpResponse.BadRequest("Não foi possivel inserir o livro!");
    }
    return response;
}

export const updateBookByGuidService = async (guid: string, book: BookModel) => {
    const existId = await BookRepository.findBookByGuid(guid);
    let response = null;

    if (existId === undefined) {
        response = await httpResponse.BadRequest({message: "Não foi possível achar o livro!"})
    }
    else {
        const data = await BookRepository.findAndModifyBookByGuid(guid, book);
        response = await httpResponse.ok(data);
    }

    return response;
}