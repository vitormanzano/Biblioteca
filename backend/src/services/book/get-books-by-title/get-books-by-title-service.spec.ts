import { InMemoryBookRepository } from "backend/src/repositories/in-memory/in-memory-book";
import { GetBookByGuidService } from "../get-book-by-guid/get-book-by-guid-service";
import { describe, it, expect, beforeEach } from "vitest";
import { BookModel } from "backend/src/models/book-model";

let booksRepository: InMemoryBookRepository;
let sut: GetBookByGuidService;

describe('Get book by title service', async () => {
    beforeEach(() => {
        booksRepository = new InMemoryBookRepository();
        sut = new GetBookByGuidService(booksRepository);
    });

    it('Should be able to get book by guid', async () => {
        const bookForCreation: BookModel = {
            GUID: '12346',
            titulo: 'livroTeste1',
            autor: 'autorTeste1',
            paginas: 10
        };

        await booksRepository.insertBook(bookForCreation);

        const existGuid = '12346';

        const existBookResponse = await sut.execute(existGuid);

        expect(existBookResponse.statusCode).toEqual(200);
    });

    it('Should not be able to get book by guid if book not exist', async () => {
        const bookForCreation: BookModel = {
            GUID: '12346',
            titulo: 'livroTeste1',
            autor: 'autorTeste1',
            paginas: 10
        };

        await booksRepository.insertBook(bookForCreation);

        const notExistGuid = '12345';

        const notExistBookResponse = await sut.execute(notExistGuid);

        expect(notExistBookResponse.statusCode).toEqual(404);
    });
})