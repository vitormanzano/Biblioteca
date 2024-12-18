import { BookModel } from "../models/book-model";
import fs from "fs/promises";
import "../data/books.json";
import { read } from "fs";

async function readFileJson() {
    const data = await fs.readFile("./src/data/books.json", "utf-8");
    return data;
}

export const findAllBooks = async (): Promise<BookModel[]> => {
    const data = await readFileJson();
    
    const books: BookModel[] = JSON.parse(data);
    return books
}

export const findBookById = async (id: number): Promise<BookModel | undefined> => {
    let data = await readFileJson();
    const books: BookModel[] = JSON.parse(data);
    return books.find(book => book.id === id);   
}