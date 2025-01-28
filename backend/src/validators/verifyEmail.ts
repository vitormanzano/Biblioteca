import validator from 'validator';

export function isValidEmail (email: string): void {
    const emailIsValid = validator.isEmail(email);

    if (!emailIsValid) {
        throw new Error("Email inválido!");
    }
}