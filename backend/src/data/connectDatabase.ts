import oracledb from 'oracledb';
import { dbConfig } from './DatabaseConfig';

export async function connectOnDatabase() {
    try {
        let connection = await oracledb.getConnection(dbConfig);
        return connection;
    }
    catch (err) {
        console.error('Erro ao conectar no banco: ',err);
        return undefined;
    }
}