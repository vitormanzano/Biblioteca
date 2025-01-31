import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper"

export class GetBookByGuidService {
    constructor (private booksRepository: IBooksRepository) {}
    
    async execute(guid: string): Promise<HttpResponseModel>  {
        guid = guid.trim();

        const data = await this.booksRepository.getBookByGuid(guid);
        let response = null

        

        if (data) {
            response = await httpResponse.ok(data);
        }
        else {
            response = await httpResponse.notFound({message: "Não foi possível achar o livro"});
        }
        return response;
    }
}