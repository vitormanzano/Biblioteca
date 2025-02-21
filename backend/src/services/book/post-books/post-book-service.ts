import { BookModel } from "backend/src/models/book-model";
import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper";

export class PostBookService {
    constructor(private booksRepository: IBooksRepository) {}

    async execute(book: BookModel): Promise<HttpResponseModel> {
        book.autor = book.autor.trim();
        book.titulo = book.titulo.trim();
        let response = null;

        console.log(book.titulo);
        if (!book.autor || !book.paginas || !book.titulo) {
            response = await httpResponse.badRequest("Digite todos os parâmetros!");
            return response;
        }

        const hasCreated = await this.booksRepository.insertBook(book);

        if (hasCreated === true) {  
            response = await httpResponse.created();
        }
        else {
            response = await httpResponse.badRequest("Não foi possivel inserir o livro!");
        }
        return response;
    }
}