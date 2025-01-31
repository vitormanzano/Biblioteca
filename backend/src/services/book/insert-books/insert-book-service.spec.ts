import { IBooksRepository } from "backend/src/repositories/models-repository/book-repository-interface";
import { InsertBookService } from "./insert-book-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBookRepository } from "backend/src/repositories/in-memory/in-memory-book";
import { BookModel } from "backend/src/models/book-model";

let booksRepository: IBooksRepository;
let sut: InsertBookService;

describe('Insert book service', async () => {
    beforeEach(() => {
        booksRepository = new InMemoryBookRepository();
        sut = new InsertBookService(booksRepository);
    });

    it('Should be able to insert a book', async () => {
        const bookForInsert: BookModel = {
            GUID: "12345678910",
            titulo: "LivroTeste",
            autor: "AutorTeste",
            paginas: 10
        };

        const insertedBookResponse = await sut.execute(bookForInsert);
        
        expect(insertedBookResponse.statusCode).toEqual(201);
    });

    it('Should not be able to insert a book without title', async () => {
        const bookWithoutTitle: BookModel = {
            GUID: "12345678910",
            titulo: "",
            autor: "AutorTeste",
            paginas: 10
        };
        const insertedBookResponse = await sut.execute(bookWithoutTitle);

        expect(insertedBookResponse.statusCode).toEqual(404)

    });
})