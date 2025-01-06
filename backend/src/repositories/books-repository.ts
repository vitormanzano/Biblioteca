import { BookModel } from "../models/book-model";
import {connectOnDatabase} from "../data/connectDatabase"
import { createGUID } from "../data/create-guid";

export async function verifyIsUndefinedOrVoid (query: any) {
    if (!query || query.length === 0) {
        return true;
    }
    return false;
}

export const findAllBooks = async (): Promise<BookModel[] | undefined> => {
    let connection = await connectOnDatabase();

    let allBooks = await connection!.execute(
        `SELECT * FROM LIVRO`
    );

    let rows = allBooks?.rows;  
    
    const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(rows);
    if (isUndefinedOrVoid) {
        return undefined;
    }

    const books: BookModel[] = rows!.map((row: any) => ({
        GUID: row[0],
        titulo: row[1],
        autor: row[2],
        paginas: row[3],
    }));

    await connection?.close();

    return books;
}

export const findBookByGuid = async (guid: string): Promise<BookModel | undefined> => {
    let connection = await connectOnDatabase();

    let getBookById = await connection!.execute (
        `SELECT * FROM LIVRO
        WHERE GUID = :guid`,
        [guid]
    );

    let rows = getBookById?.rows as any;
    
    const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(rows);

    if (isUndefinedOrVoid) {
        return undefined;
    }

    const book: BookModel = {
        GUID: rows![0][0],
        titulo: rows![0][1],
        autor: rows![0][2],
        paginas: rows![0][3]
    };

    await connection?.close();

    return book;
}

export const findBookByName = async (title: string): Promise<BookModel[] | undefined> => {
    let connection = await connectOnDatabase(); 

    try {
        const searchTitle = '%' + title + '%'; 

        let searchedBooksList =  await connection?.execute(`SELECT * FROM LIVRO WHERE titulo LIKE :searchTitle`,
        [searchTitle]
    );
    
    let rows = searchedBooksList?.rows;

    const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(rows);
    if (isUndefinedOrVoid) {
        return undefined;
    }

    const books: BookModel[] = rows!.map((row: any) => ({
        GUID: row[0],
        titulo: row[1],
        autor: row[2],
        paginas: row[3],
    }));

    return books;

    }
    catch (err) {
        console.log("Erro ao executar: ");
        return undefined;
    }
    finally {
        await connection?.close;
    }
}

export const deleteBookByGuid = async (guid: string): Promise<Boolean> => {
    let connection = await connectOnDatabase();
    try {
        await connection?.execute (
            `DELETE FROM LIVRO WHERE GUID = :guid`,
            [guid]
        );
    
        await connection?.commit();
        await connection?.close();

        return true;
    }
    catch (err) {
        return false;
    }
}

export const insertBook = async (book: BookModel): Promise<Boolean> => {
    let connection = await connectOnDatabase();

    // await createTableBook();
    const GUID = await createGUID();

    //ID gerado por uma sequence | id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY
    try {
        await connection?.execute (
            `INSERT INTO LIVRO(GUID,titulo, autor, paginas) VALUES(:guid,:titulo, :autor, :paginas)`,
            {
                guid: GUID,
                titulo: book.titulo,
                autor: book.autor,
                paginas: book.paginas
            }
        );

        await connection?.commit();
        await connection?.close();

        return true;
    }
    catch (err) {
        console.log("Não foi possível inserir o livro!");
        return false;
    }
}

export const findAndModifyBookByGuid = async (guid: string, book: BookModel): Promise<BookModel> => {
    let connection = await connectOnDatabase();

    await connection?.execute (
        `UPDATE LIVRO
        SET titulo = :titulo, autor = :autor, paginas = :paginas
        WHERE GUID = :guid`,
        {
            guid: guid,
            titulo: book.titulo,
            autor: book.autor,
            paginas: book.paginas
        },
    );

    await connection?.commit();
    await connection?.close();

    return book;
}