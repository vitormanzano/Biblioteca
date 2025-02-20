import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper";

export class GetAllBooksService {
    constructor (private booksRepository: IBooksRepository) {}

    async execute(): Promise<HttpResponseModel> {
        const allBooks = await this.booksRepository.getAllBooks();
        let response = null;

        if (allBooks) {
            response = await httpResponse.ok(allBooks);
        }
        else {
            response = await httpResponse.notFound({message: "Nenhum livro encontrado!"});
        }
        return response;
    }
}