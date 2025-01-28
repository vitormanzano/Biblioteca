import oracledb from 'oracledb';
import { connectOnDatabase } from "../data/connectDatabase";
import { createGUID } from "../data/create-guid";

export async function findAuthorByName(nome: string, connection: oracledb.Connection): Promise<[Array<{GUID: string}>]> {
    const searchAuthor =  await connection?.execute (
        `SELECT guid FROM AUTOR WHERE nome = :nome`,
        [nome]
    ) as [Array<{GUID: string}>]

    return searchAuthor;
}

export async function insertAuthor (name: string): Promise<string | undefined> {
    const connection = await connectOnDatabase();
    const GUID = createGUID();
    
    try {
        await connection!.execute (
            `INSERT INTO AUTOR (GUID, nome) 
                        VALUES(:guid, :nome)`,
            [
                {val: GUID},
                {val: name}
            ]
        );
        await connection?.commit();
        await connection?.close();

        return GUID;
    }
    catch (error) {
        console.log(error);
    }
}

export async function findAuthorByGuid(guid: string, connection: oracledb.Connection) {

}