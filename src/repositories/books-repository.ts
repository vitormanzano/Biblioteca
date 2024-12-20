import { BookModel } from "../models/book-model";
import {conectarBanco} from "../data/connectDatabase"

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
    await conn?.close();

    return books;
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
    await conn?.close();

    return book;
}

export const deleteBookById = async (id: number): Promise<Boolean> => {
    let conn = await conectarBanco();

    await conn?.execute (
        `DELETE FROM LIVRO WHERE id = :id`,
        [id]
    );

    await conn?.commit();
    await conn?.close();

    return true;
}

export const insertBook = async (book: BookModel) => {
    let conn = await conectarBanco();

    await conn?.execute (
        `INSERT INTO LIVRO VALUES(:id, :titulo, :autor, :paginas)`,
        {
            id: book.id,
            titulo: book.titulo,
            autor: book.autor,
            paginas: book.paginas
        }
    );

    await conn?.commit();
    await conn?.close();
}

export const findAndModifyBookById = async (id: number, book: BookModel): Promise<BookModel> => {
    let conn = await conectarBanco();

    await conn?.execute (
        `UPDATE LIVRO
        SET titulo = :titulo, autor = :autor, paginas = :paginas
        WHERE id = :id`,
        {
            id: id,
            titulo: book.titulo,
            autor: book.autor,
            paginas: book.paginas
        },
    );

    await conn?.commit();
    await conn?.close();

    return book;
}