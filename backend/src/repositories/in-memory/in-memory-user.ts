import { UserModel } from "../../models/user-model";
import { IUsersRepository } from "../models-repository/user-repository-interface";

export class InMemoryUsersRepository implements IUsersRepository {
    private userList: UserModel[] = [];

    async insertUser(user: UserModel): Promise<Boolean> {
        this.userList.push(user);

        return true;
    }
    async getAllUsers(): Promise<UserModel[] | undefined> {
        if (this.userList.length === 0 ) {
            return undefined;
        }
        return this.userList;
    }
    async getUserByCpf(cpf: string): Promise<UserModel | undefined> {
        const user = this.userList.find(item => item.cpf === cpf);

        if (!user) {
            return undefined
        }
        return user;
    }
    async deleteUserByCpf(cpf: string): Promise<boolean> {
        const index = this.userList.findIndex(item => item.cpf === cpf);

        if (index == -1) {
            return false;
        }
        this.userList.splice(index, 1);
        return true;

    }
    
}