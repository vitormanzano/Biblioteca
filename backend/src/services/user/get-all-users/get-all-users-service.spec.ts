import { InMemoryUsersRepository } from "backend/src/repositories/in-memory/in-memory-user";
import { GetAllUsersService } from "./get-all-users-service";
import { beforeEach, describe, expect, it } from "vitest";
import { UserModel } from "backend/src/models/user-model";

let usersRepository: InMemoryUsersRepository;
let sut: GetAllUsersService;

describe('Get all users service', async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetAllUsersService(usersRepository);
    });

    it('Should be able to get all users', async () => {
        const user1: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user1);

        const user2: UserModel = {
            cpf: "12345678911",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user2);

        const allUsers =  await sut.execute();

        expect(allUsers.statusCode).toEqual(200);
        expect(allUsers.body).toHaveLength(2);
    });

    it('Should not be able to get any user if not have users', async () => {
        const allUsers = await sut.execute();

        expect(allUsers.statusCode).toEqual(404);
        expect(allUsers.body).toEqual(expect.objectContaining({message: "Nenhum usuário encontrado"}));
    })
})