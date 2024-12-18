import { BookModel } from "../models/book-model";
import fs from "fs/promises";
import "../data/books.json";
import { read } from "fs";

async function readFileJson() {
    const data = await fs.readFile("./src/data/books.json", "utf-8");
    return data;
}

async function writeFileJson(data: BookModel[]): Promise<void> {
    await fs.writeFile("./src/data/books.json", JSON.stringify(data, null, 2), "utf-8");
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

export const deleteBookById = async (id: number): Promise<Boolean> => {
    const data  = await readFileJson();
    const books: BookModel[] = JSON.parse(data);

    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        books.splice(index,1);
        
        await writeFileJson(books)
        return true
    }
    return false;
}