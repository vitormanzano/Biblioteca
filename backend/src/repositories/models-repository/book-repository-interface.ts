import { BookModel } from "../../models/book-model";

export interface IBooksRepository {
    insertBook(book: BookModel): Promise<Boolean>
    getAllBooks(): Promise<BookModel[] | undefined>
    getBookByGuid(guid: string): Promise<BookModel | undefined>
    getBooksByTitle(title: string): Promise<BookModel[] | undefined>
    deleteBookByGuid(guid: string): Promise<Boolean>
    getAndModifyBookByGuid(guid: string, book: BookModel): Promise<BookModel | undefined>
}