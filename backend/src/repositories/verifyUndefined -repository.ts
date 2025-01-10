export async function verifyIsUndefinedOrVoid (query: any) {
    if (!query || query.length === 0) {
        return true;
    }
    return false;
}