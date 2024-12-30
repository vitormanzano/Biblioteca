import { randomUUID } from 'crypto';

export async function createGUID() {
    const guid = randomUUID();
    return guid;
}