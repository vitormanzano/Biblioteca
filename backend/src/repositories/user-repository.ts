import { commitAndCloseDatabase } from "../data/commitAndCloseDatabase";
import { connectOnDatabase } from "../data/connectDatabase";
import { UserModel } from "../models/user-model";

export const insertUserRepository = async (user: UserModel): Promise<Boolean> => {
    const connection = await connectOnDatabase();
    console.log(typeof(connection));
    try {
        const insertedUser = await connection!.execute (
            `INSERT INTO PESSOA (cpf, nome, email, senha) 
                VALUES (:cpf, :nome, :email, :senha)`,
                [
                    user.cpf,
                    user.email,
                    user.nome,
                    user.senha
                ]
        );

        await commitAndCloseDatabase(connection!)

        return true;
    } 
    
    catch (error) {
        console.log(error);
        return false
    }
}