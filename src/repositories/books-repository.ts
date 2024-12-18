import { BookModel } from "../models/book-model";
import fs from "fs/promises";
import "../data/books.json";

export const findAllBooks = async (): Promise<BookModel[]> => {
    const data = await fs.readFile("./src/data/books.json", "utf-8");
    
    const books: BookModel[] = JSON.parse(data);
    return books
}