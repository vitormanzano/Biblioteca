import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import { DeleteBookByGuidService } from "./delete-book-by-guid-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBookRepository } from "backend/src/repositories/in-memory/in-memory-book";
import { BookModel } from "backend/src/models/book-model";

let booksRepository: IBooksRepository;
let sut: DeleteBookByGuidService;

describe('Delete book by guid service', async () => {
    beforeEach(() => {
        booksRepository = new InMemoryBookRepository();
        sut = new DeleteBookByGuidService(booksRepository);
    });

    it('Should be able to delete a book by guid', async () => {
        const bookForCreation: BookModel = {
            GUID: '1234',
            titulo: 'livroTeste',
            autor: 'autorTeste',
            paginas: 10
        }; 
        
        await booksRepository.insertBook(bookForCreation);

        const existGuid = '1234'

        const hasDeletedBook = await sut.execute(existGuid);

        expect(hasDeletedBook.statusCode).toEqual(200);
    });

    it('Should not be able to deleta a book if not exist', async () => {
        const bookForCreation: BookModel = {
            GUID: '1234',
            titulo: 'livroTeste',
            autor: 'autorTeste',
            paginas: 10
        }; 
        
        await booksRepository.insertBook(bookForCreation);

        const notExistGuid = '12345'

        const hasDeletedBook = await sut.execute(notExistGuid);

        expect(hasDeletedBook.statusCode).toEqual(400);
    });
    
});