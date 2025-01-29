import { UserModel } from "../models/user-model";

export interface IUsersRepository {
    insertUser(user: UserModel): Promise<Boolean>
    getAllUsers(): Promise<UserModel[] | undefined>
    getUserByCpf(cpf: string): Promise<UserModel | undefined>
    deleteUserByCpf(cpf: string): Promise<boolean>
}