export class UserAlreadyExistyError extends Error {
    statusCode: number = 400

    constructor () {
        super('E-mail already exists.');
    }
}