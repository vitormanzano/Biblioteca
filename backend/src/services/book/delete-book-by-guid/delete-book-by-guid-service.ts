import { HttpResponseModel } from "backend/src/models/http-response-model";
import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import * as httpResponse from "../../../utils/http-helper";

export class DeleteBookByGuidService {
    constructor(private booksRepository: IBooksRepository) {}

    async execute(guid: string): Promise<HttpResponseModel> {
        guid = guid.trim();

        const existId = await this.booksRepository.getBookByGuid(guid);

        let response = null;
    
        if (existId === undefined) {
            response = await httpResponse.badRequest({message: "Não foi possível achar o livro!"});
            return response
        } 
    
        const isDeleted = await this.booksRepository.deleteBookByGuid(guid);
    
        if (isDeleted) {
            response = await httpResponse.ok({message: "Livro Deletado!"}); 
        }
        else {
            response = await httpResponse.badRequest("Não foi possível deletar o livro");
        }
        return response;
    }
}