import { UserModel } from "../../models/user-model";
import { IUsersRepository } from "../user-repository-interface";

export class InMemoryUsersRepository implements IUsersRepository {
    public items: UserModel[] = [];

    async insertUser(user: UserModel): Promise<Boolean> {
        this.items.push(user);

        return true;
    }
    async getAllUsers(): Promise<UserModel[] | undefined> {
        if (this.items.length === 0 ) {
            return undefined;
        }
        return this.items;
    }
    async getUserByCpf(cpf: string): Promise<UserModel | undefined> {
        const user = this.items.find(item => item.cpf === cpf);

        if (!user) {
            return undefined
        }
        return user;
    }
    async deleteUserByCpf(cpf: string): Promise<boolean> {
        const index = this.items.findIndex(item => item.cpf === cpf);

        if (index == -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;

    }
    
}