import { BookModel } from "backend/src/models/book-model";
import { IBooksRepository } from "../models-repository/book-repository-interface";

export class InMemoryBookRepository implements IBooksRepository {
    private bookList: BookModel[] = [];

    async insertBook(book: BookModel): Promise<Boolean> {
        this.bookList.push(book);

        return true;
    }

    async getAllBooks(): Promise<BookModel[] | undefined> {
        if ( this.bookList.length === 0) {
            return undefined;
        }
        return this.bookList;
    }

    async getBookByGuid(guid: string): Promise<BookModel | undefined> {
        const searchedBook = this.bookList.find(book => book.GUID === guid);

        if (!searchedBook) {
            return undefined;
        }
        return searchedBook;
    }

    async getBookByTitle(title: string): Promise<BookModel[] | undefined> {
        const bookListTitle: BookModel[] = [];

        for (let i = 0; i < this.bookList.length; i++) {
            if (this.bookList[i].titulo === title) {
                bookListTitle.push(this.bookList[i]);
            }
        }
        console.log(bookListTitle);

        if (!bookListTitle) {
            return undefined;
        }
    }

    async deleteBookByGuid(guid: string): Promise<Boolean> {
        const bookHasFinded = this.bookList.findIndex(book => book.GUID === guid);

        this.bookList.splice(bookHasFinded, 1); //Splice => Delete the book in the index of bookHasFinded
        return true;
    }

    async getAndModifyBookByGuid(guid: string, book: BookModel): Promise<BookModel | undefined> {
        const existBook = this.getBookByGuid(guid);

        if (!existBook) {
            return undefined
        }

        const indexOfBook = this.bookList.findIndex(book => book.GUID === guid);
        this.bookList[indexOfBook] = book;
        return book;
    }
    
}