import { Database } from "sqlite";

export async function createUsersTable(db: Database): Promise<void> {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `);
}

export async function seedUsersTable(db: Database): Promise<void> { }
