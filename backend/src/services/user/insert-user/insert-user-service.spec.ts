import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-user";
import { beforeEach, describe, expect, it } from "vitest";
import { UserModel } from "../../../models/user-model";
import { InsertUserService } from "./insert-user-service";

let usersRepository: InMemoryUsersRepository;
let sut: InsertUserService

describe('Create a user', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new InsertUserService(usersRepository);
    })


    it('Should be able to create a user', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        };

        const response = await sut.execute(user);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual(expect.objectContaining({
            message: "Successful"
        }))
    });

    it('Should not be able to create a user if cpf is invalid', async () => {
        const user: UserModel = {
            cpf: "123456789",
            nome: "Vitor",
            email: "vitor@test.com",
            senha: "1234"
        }
        await expect(() => sut.execute(user)).rejects.toBeInstanceOf(Error);
    });

    it('Should not be able to create a user if email is invalid', async () => {
        const user: UserModel = {
            cpf: "12345678910",
            nome: "Vitor",
            email: "vitor.com",
            senha: "1234"
        }

        await expect(() => sut.execute(user)).rejects.toBeInstanceOf(Error);
    });
});