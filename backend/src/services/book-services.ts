import { BookModel } from "../models/book-model";
import { HttpResponseModel } from "../models/http-response-model";
import * as BookRepository from "../repositories/book-repository";
import * as httpResponse from "../utils/http-helper";

export const getAllBooksService = async (): Promise<HttpResponseModel> => {
    const data = await BookRepository.getAllBooks();
    let response = null;

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.notFound({message: "Nenhum livro encontrado!"});
    }
    return response;
}

export const getBookByGuidService = async (guid: string): Promise<HttpResponseModel> => {
    guid = guid.trim();

    const data = await BookRepository.getBookByGuid(guid);
    let response = null

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.notFound({message: "Não foi possível achar o livro"});
    }
    return response;
}

export const getBooksByNameService = async (title: string): Promise<HttpResponseModel> => {
    title = title.trim();

    const data = await BookRepository.getBookByName(title);
    let response = null;

    if (data) {
        response = await httpResponse.ok(data);
    }
    else {
        response = await httpResponse.notFound({message: "Ooops... Não encontramos nada!"});
    }
    return response;
}

export const deleteBookByGuidService = async (guid: string): Promise<HttpResponseModel> => {
    guid = guid.trim();

    const existId = await BookRepository.getBookByGuid(guid);
    let response = null;

    if (existId === undefined) {
        response = await httpResponse.badRequest({message: "Não foi possível achar o livro!"});
        return response
    } 

    const isDeleted = await BookRepository.deleteBookByGuid(guid);

    if (isDeleted) {
        response = await httpResponse.ok({message: "Livro Deletado!"}); 
    }
    else {
        response = await httpResponse.badRequest("Não foi possível deletar o livro");
    }
    return response;
}

export const insertBookService = async (book: BookModel): Promise<HttpResponseModel> => {
    book.autor = book.autor.trim();
    book.titulo = book.titulo.trim();

    let response = null;
    const hasCreated = await BookRepository.insertBook(book);

    if (hasCreated === true) {  
        response = await httpResponse.created();
    }
    else {
        response = await httpResponse.badRequest("Não foi possivel inserir o livro!");
    }
    return response;
}

export const updateBookByGuidService = async (guid: string, book: BookModel): Promise<HttpResponseModel> => {
    guid = guid.trim();

    book.autor = book.autor.trim();
    book.titulo = book.titulo.trim();

    const existId = await BookRepository.getBookByGuid(guid);
    let response = null;

    if (existId === undefined) {
        response = await httpResponse.badRequest({message: "Não foi possível achar o livro!"})
    }
    else {
        const data = await BookRepository.getAndModifyBookByGuid(guid, book);
        response = await httpResponse.ok(data);
    }
    return response;
}