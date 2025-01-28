import { verifyCpfLength } from "./verifyLengthCpf";

export async function isValidCPF(cpf: string): Promise<void> {
    if (!cpf) {
        throw new Error("Insira um cpf!");
    }

    const cpfIsValid = await verifyCpfLength(cpf);

    if (!cpfIsValid) {
        throw new Error("Cpf inválido!");
    }
}
