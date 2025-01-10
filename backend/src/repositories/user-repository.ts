import { connectOnDatabase } from "../data/connectDatabase"
import { UserModel } from "../models/user-model"
import { verifyIsUndefinedOrVoid } from "./verifyUndefined -repository";


export const insertUserRepository = async (user: UserModel): Promise<Boolean> => {
    const connection = await connectOnDatabase();

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
        )

        await connection?.commit();
        await connection?.close();

        return true;
    } 
    
    catch (error) {
        console.log(error);
        return false
    }
}