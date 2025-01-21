import {UserModel} from "../models/user-model";

export async function haveAllTheUserParameters(user: UserModel): Promise<Boolean> {
    const requiredFields: (keyof UserModel)[] = ["cpf", "email", "nome", "senha"];

    if (requiredFields.some(field => !user[field])) {
        return false;
    }
    return true;
}