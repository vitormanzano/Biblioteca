import oracledb from 'oracledb';

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONN_STR
};

export async function conectarBanco() {
    try {
        let connection = await oracledb.getConnection(dbConfig);
        return connection;
    }
    catch (err) {
        console.error('Erro ao conectar: ',err);
        return undefined
    }
}