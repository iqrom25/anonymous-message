import Pool from 'pg-pool';


const { DB_DRIVER: dbDriver, DB_USERNAME: dbUsername, DB_PASSWORD: DB_PASSWORD, DB_HOST: dbHost, DB_PORT: dbPort, DB_NAME: dbName } = process.env;

const connectionString = `${dbDriver}://${dbUsername}:${DB_PASSWORD}@${dbHost}:${dbPort}/${dbName}`;
const pool = new Pool({ connectionString });

export default pool;

