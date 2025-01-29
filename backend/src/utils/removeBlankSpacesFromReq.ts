export async function removeBlankSpacesFromReq(fields: string[]): Promise<void> {
    for (let field in fields) {
        field.trim();
    }
}