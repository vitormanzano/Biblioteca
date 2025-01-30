import { IUsersRepository } from "backend/src/repositories/models-repository/user-repository-interface";
import { DeleteUserByCpfService } from "./delete-user-by-cpf-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "backend/src/repositories/in-memory/in-memory-user";
import { UserModel } from "backend/src/models/user-model";

let usersRepository: IUsersRepository;
let sut: DeleteUserByCpfService;

describe('Delete user by cpf service', async () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new DeleteUserByCpfService(usersRepository);
    });

    it('Should deleted a user with cpf', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user);

        const validCpf = "12345678910";

        const hasDeleted = await sut.execute(validCpf);

        expect(hasDeleted.statusCode).toEqual(200);
    });

    it('Should not be able to delete a user if he not exist', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        await usersRepository.insertUser(user);

        const notExistCpf = "12345678911";

        const hasDeleted = await sut.execute(notExistCpf);

        expect(hasDeleted.statusCode).toEqual(400);

    })

    it('Should not be able to delete a user if cpf is invalid', async () => {
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