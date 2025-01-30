import { BookModel } from "../../models/book-model";
import {connectOnDatabase} from "../../data/connectDatabase"
import { createGUID } from "../../data/create-guid";
import { verifyIsUndefinedOrVoid } from "../../validators/verifyUndefined -repository";
import { commitAndCloseDatabase } from "../../data/commitAndCloseDatabase";
import * as AuthorRepository from ".././author-repository";
import { IBooksRepository } from "../book-repository-interface";

export class SQLBooksRepository implements IBooksRepository {
    
    async insertBook(book: BookModel): Promise<Boolean> {
        let connection = await connectOnDatabase();

        const GUID = await createGUID();
    
        try {
            
            const searchAuthorQuery = await AuthorRepository.findAuthorByName(book.autor, connection!);

            const GUIDAuthor = await verifyIsUndefinedOrVoid(searchAuthorQuery[0]) ? 
                            await AuthorRepository.insertAuthor(book.autor) : 
                            searchAuthorQuery[0]; 
            
            await connection?.execute (
                `INSERT INTO LIVRO (GUID, titulo, autor_guid, paginas) 
                            VALUES (:GUID, :titulo, :GUIDAuthor, :paginas)`,
                [   
                    {val: GUID},
                    {val: book.titulo},
                    {val: GUIDAuthor},
                    {val: book.paginas}
                ]
            );
            
            await commitAndCloseDatabase(connection!)

            return true;
        }
        catch (err) {
            console.log("Não foi possível inserir o livro!");
            return false;
        }
    }

    async getAllBooks(): Promise<BookModel[] | undefined> {
        const connection = await connectOnDatabase();

        let allBooks = await connection!.execute(
            `SELECT * FROM LIVRO`
        );

        let allBooksQuery = allBooks?.rows;  
        
        const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(allBooksQuery);
        if (isUndefinedOrVoid) {
            return undefined;
        }

        const books: BookModel[] = allBooksQuery!.map((row: any) => ({
            GUID: row[0],
            titulo: row[1],
            autor: row[2],
            paginas: row[3],
        }));

        await commitAndCloseDatabase(connection!);
        return books;
    }

    async getBookByGuid(guid: string): Promise<BookModel | undefined> {
        let connection = await connectOnDatabase();

        let getBookById = await connection!.execute (
            `SELECT * FROM LIVRO
            WHERE GUID = :guid`,
            [guid]
        );

        let bookQuery = getBookById?.rows as any;
        
        const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(bookQuery);

        if (isUndefinedOrVoid) {
            return undefined;
        }

        const book: BookModel = {
            GUID: bookQuery![0][0],
            titulo: bookQuery![0][1],
            autor: bookQuery![0][2],
            paginas: bookQuery![0][3]
        };

        await commitAndCloseDatabase(connection!)

        return book;
    }

    async getBookByTitle(title: string): Promise<BookModel[] | undefined> {
        let connection = await connectOnDatabase(); 

        try {
            const searchTitle = '%' + title + '%'; 

            let searchedBooksList =  await connection?.execute(`SELECT * FROM LIVRO WHERE titulo LIKE :searchTitle`,
            [searchTitle]
        );
        
        let searchedBooksQuery = searchedBooksList?.rows;

        const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(searchedBooksQuery);
        if (isUndefinedOrVoid) {
            return undefined;
        }

        const books: BookModel[] = searchedBooksQuery!.map((row: any) => ({
            GUID: row[0],
            titulo: row[1],
            autor: row[2],
            paginas: row[3],
        }));

        return books;

        }
        catch (err) {
            return undefined;
        }
        finally {
            await commitAndCloseDatabase(connection!)
        }
    }

    async deleteBookByGuid(guid: string): Promise<Boolean> {
        let connection = await connectOnDatabase();

        try {
            await connection?.execute (
                `DELETE FROM LIVRO WHERE GUID = :guid`,
                [guid]
            );
        
            await commitAndCloseDatabase(connection!)

            return true;
        }
        catch (err) {
            return false;
        }
    }

    async getAndModifyBookByGuid(guid: string, book: BookModel): Promise<BookModel> {
        let connection = await connectOnDatabase();

        await connection?.execute (
            `UPDATE LIVRO
            SET titulo = :titulo, 
            autor = :autor, 
            paginas = :paginas
            WHERE GUID = :guid`,
            {
                guid: guid,
                titulo: book.titulo,
                autor: book.autor,
                paginas: book.paginas
            },
        );

        await commitAndCloseDatabase(connection!)

        return book;
    }
}