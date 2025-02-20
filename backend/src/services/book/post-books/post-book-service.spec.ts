import { IBooksRepository } from "backend/src/repositories/models/book-repository-interface";
import { PostBookService } from "./post-book-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBookRepository } from "backend/src/repositories/in-memory/in-memory-book";
import { BookModel } from "backend/src/models/book-model";

let booksRepository: IBooksRepository;
let sut: PostBookService;

describe('Post book service', async () => {
    beforeEach(() => {
        booksRepository = new InMemoryBookRepository();
        sut = new PostBookService(booksRepository);
    });

    it('Should be able to post a book', async () => {
        const bookForInsert: BookModel = {
            GUID: "12345678910",
            titulo: "LivroTeste",
            autor: "AutorTeste",
            paginas: 10
        };

        const insertedBookResponse = await sut.execute(bookForInsert);
        
        expect(insertedBookResponse.statusCode).toEqual(201);
    });

    it('Should not be able to post a book without title', async () => {
        const bookWithoutTitle: BookModel = {
            GUID: "12345678910",
            titulo: "",
            autor: "AutorTeste",
            paginas: 10
        };
        const insertedBookResponse = await sut.execute(bookWithoutTitle);

        expect(insertedBookResponse.statusCode).toEqual(400);

    });
})