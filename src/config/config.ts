import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
}

interface Config {
    port: number;
    nodeEnv: string;
    database: DatabaseConfig;
}

const dbConfig: DatabaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'kollectbin',
    user: process.env.DB_USER || 'user'
};

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'dev',
    database: dbConfig
};

export default config;
