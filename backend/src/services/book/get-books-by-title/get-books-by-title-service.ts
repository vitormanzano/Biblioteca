import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper";

export class GetBookByTitleService {
    constructor (private booksRepository: IBooksRepository) {}

    async execute(title: string): Promise<HttpResponseModel> {
        title = title.trim();

        const data = await this.booksRepository.getBooksByTitle(title);
        
        let response = null;

        if (data) {
            response = await httpResponse.ok(data);
        }
        else {
            response = await httpResponse.notFound({message: "Ooops... Não encontramos nada!"});
        }
        return response;
    }
}