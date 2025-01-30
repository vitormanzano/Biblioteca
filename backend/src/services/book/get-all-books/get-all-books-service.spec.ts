import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import { GetAllBooksService } from "./get-all-books-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBookRepository } from "backend/src/repositories/in-memory/in-memory-book";
import { BookModel } from "backend/src/models/book-model";

let booksRepository: IBooksRepository;
let sut: GetAllBooksService;

describe('Get all books', async () => {
    beforeEach(() => {
        booksRepository = new InMemoryBookRepository();
        sut = new GetAllBooksService(booksRepository);
    });

    it('Should be able to get all books', async () => {
        const bookForCreation1: BookModel = {
            GUID: '12346',
            titulo: 'livroTeste1',
            autor: 'autorTeste1',
            paginas: 10
        };
        const bookForCreation2: BookModel = {
            GUID: '12345',
            titulo: 'livroTeste2',
            autor: 'autorTeste2',
            paginas: 10
        };

        await booksRepository.insertBook(bookForCreation1);
        await booksRepository.insertBook(bookForCreation2);

        const allBooksResponse = await sut.execute();

        expect(allBooksResponse.statusCode).toEqual(200);
        expect(allBooksResponse.body).toHaveLength(2);
    });

    it('Should not be able to get all books if not exist anyone', async () => {
        const allBooksResponse = await sut.execute();

        expect(allBooksResponse.statusCode).toEqual(404);
        expect(allBooksResponse.body).toMatchObject({message: "Nenhum livro encontrado!"});
    });
})

