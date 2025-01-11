import oracledb from 'oracledb';

export async function commitAndCloseDatabase(connection: oracledb.Connection) {
    await connection.commit();
    await connection.close();
};