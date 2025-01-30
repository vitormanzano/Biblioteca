import { BookModel } from "backend/src/models/book-model";
import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper";

export class UpdateBookByGuidService {
    constructor(private booksRepository: IBooksRepository) {}

    async execute(guid: string, book: BookModel): Promise<HttpResponseModel> {
        guid = guid.trim();

        book.autor = book.autor.trim();
        book.titulo = book.titulo.trim();
    
        const existId = await this.booksRepository.getBookByGuid(guid);
        let response = null;
    
        if (existId === undefined) {
            response = await httpResponse.badRequest({message: "Não foi possível achar o livro!"})
        }
        else {
            const data = await this.booksRepository.getAndModifyBookByGuid(guid, book);
            response = await httpResponse.ok(data);
        }
        return response;
    }
}