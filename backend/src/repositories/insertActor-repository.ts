import { connectOnDatabase } from "../data/connectDatabase";
import { createGUID } from "../data/create-guid";

export async function insertActor (name: string): Promise<string | undefined> {
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
