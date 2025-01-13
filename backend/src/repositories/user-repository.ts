import { commitAndCloseDatabase } from "../data/commitAndCloseDatabase";
import { connectOnDatabase } from "../data/connectDatabase";
import { UserModel } from "../models/user-model";
import { verifyIsUndefinedOrVoid } from "./verifyUndefined -repository";

export const insertUser = async (user: UserModel): Promise<Boolean> => {
    const connection = await connectOnDatabase();

    try {
            await connection!.execute (
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

export const getAllUsers = async (): Promise<UserModel[] | undefined> => {
    const connection = await connectOnDatabase();

    try {
        const allUsers = await connection!.execute (
            `SELECT * FROM PESSOA`
        );
        let allUsersQuery = allUsers?.rows;  

        const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(allUsersQuery);

        if (isUndefinedOrVoid) {
            return undefined;
        }

        const users: UserModel[] = allUsersQuery!.map((user: any) => ({
            cpf: user[0],
            nome: user[1],
            email: user[2],
            senha: user[3],
        }));

        await commitAndCloseDatabase(connection!);

        return users;

    } 
    catch (error) {
        return undefined;
    }
}

export const getUserByCpf = async (cpf: string): Promise<UserModel | undefined> => {
    const connection = await connectOnDatabase();

    try {
        const selectedUser = await connection!.execute (
            `SELECT * FROM PESSOA
            WHERE cpf = :cpf`,
            [cpf]
        );
        let userQuery = selectedUser?.rows as any;

        const isUndefinedOrVoid = await verifyIsUndefinedOrVoid(userQuery);

        if (isUndefinedOrVoid) {
            return undefined;
        } 

        const user: UserModel = {
            cpf: userQuery[0][0],
            nome: userQuery[0][1],
            email: userQuery[0][2],
            senha: userQuery[0][3]
        };
        
        commitAndCloseDatabase(connection!);
        return user;
    } 
    catch (error) {
        return undefined
    }
}

export const deleteUserByCpf = async (cpf: string): Promise<Boolean> => {
    const connection = await connectOnDatabase();

    try {
        await connection!.execute (
            `DELETE FROM PESSOA
            WHERE cpf = :cpf`,
            [cpf]
        );

        await commitAndCloseDatabase(connection!);

        return true;
    } 
    catch (error) {
        return false;
    }
}
