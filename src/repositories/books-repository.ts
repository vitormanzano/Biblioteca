import { BookModel } from "../models/book-model";
import fs from "fs/promises";
import "../data/books.json";
import {conectarBanco} from "../data/connectDatabase"

export async function readFileJson() {
    const data = await fs.readFile("./src/data/books.json", "utf-8");
    return data;
}

async function writeFileJson(data: BookModel[]): Promise<void> {
    await fs.writeFile("./src/data/books.json", JSON.stringify(data, null, 2), "utf-8");
}

async function verifyIsUndefinedOrVoid (query: any) {
    if (!query || query.length === 0) {
        return false;
    }
    return true;
}

export const findAllBooks = async (): Promise<BookModel[] | undefined> => {
    let conn = await conectarBanco();

    let allBook = await conn!.execute(
        `SELECT * FROM LIVRO`
    );

    //console.log('Resultado é: ', JSON.stringify(allBook.rows)); 

    let rows = allBook?.rows;  
    
    const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(rows);

    if (!isUndefinedOrVoid) {
        return undefined
    }

    const books: BookModel[] = rows!.map((row: any) => ({
        id: row[0],
        titulo: row[1],
        autor: row[2],
        paginas: row[3],
    }));

    await conn?.commit();

    return books;

//     console.log(`Resultado: ${rows}`);

//     const data = await readFileJson();
    
//     const books: BookModel[] = JSON.parse(data);
//     return books
}

export const findBookById = async (id: number): Promise<BookModel | undefined> => {
    let conn =  await conectarBanco();

    let getBookById = await conn!.execute (
        `SELECT * FROM LIVRO
        WHERE id = :id`,
        [id]
    );

    let rows = getBookById?.rows as any;
    
    const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(rows);

    if (!isUndefinedOrVoid) {
        return undefined
    }

    const book: BookModel = {
        id: rows![0][0],
        titulo: rows![0][1],
        autor: rows![0][2],
        paginas: rows![0][3]
    };

    await conn?.commit();

    return book;

    // let data = await readFileJson();
    // const books: BookModel[] = JSON.parse(data);
    // return books.find(book => book.id === id);   
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

export const insertBook = async (book: BookModel) => {
    const data = await readFileJson();
    const books: BookModel[] = JSON.parse(data);

    books.push(book);

    await writeFileJson(books);
}

export const findAndModifyBookById = async (id: number, book: BookModel): Promise<BookModel> => {
    const data = await readFileJson();
    const books: BookModel[] = JSON.parse(data);

    const bookIndex = books.findIndex(bookToFind => bookToFind.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = book;
        await writeFileJson(books);
    }
    return books[bookIndex];
}