import { Pool } from 'pg';
import config from '../config/config.js';

const pool = new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.name,
    password: '',
    port: config.database.port
});

export default pool;
