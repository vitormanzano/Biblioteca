import { IUsersRepository } from "backend/src/repositories/models/user-repository-interface";
import { GetUserByCpfService } from "./get-user-by-cpf-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "backend/src/repositories/in-memory/in-memory-user";
import { UserModel } from "backend/src/models/user-model";

let usersRepository: IUsersRepository;
let sut: GetUserByCpfService;

describe('Get user by cpf', async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserByCpfService(usersRepository);
    });

    it('Should be able to geta user by cpf', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user);

        const validCpf = "12345678910";

        const hasUser = await sut.execute(validCpf);

        expect(hasUser.statusCode).toEqual(200);
    });

    it('Should not be able to get a user if cpf not exists', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user);

        const notExistCpf = "12345678911";

        const hasUser = await sut.execute(notExistCpf);

        expect(hasUser.statusCode).toEqual(404);
    });

    it('Should not be able to get a user if cpf is invalid', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user);

        const invalidCpf = "123456789";

        await expect(() => sut.execute(invalidCpf)).rejects.toBeInstanceOf(Error);
    });
})