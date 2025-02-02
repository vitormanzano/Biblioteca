import { SQLUsersRepository } from "../repositories/SQL/SQL-user-repository";
import { SignInUserService } from "../services/user/signIn-user/sign-in-user-service";

export function makeSignInUser() {
    const usersRepository = new SQLUsersRepository();
    const signInUserService = new SignInUserService(usersRepository);

    return signInUserService;
}