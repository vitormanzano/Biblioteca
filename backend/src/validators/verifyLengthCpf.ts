
export async function verifyCpfLength (cpf: string): Promise<Boolean> {
    if (cpf.length != 11) return false;
    return true;
}