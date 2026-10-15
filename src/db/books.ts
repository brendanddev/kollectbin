import { Database } from "sqlite";

export async function createBooksTable(db: Database): Promise<void> {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY,
            isbn TEXT NOT NULL,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT NOT NULL,
            year INTEGER NOT NULL,
            genre TEXT NOT NULL
        );
    `);
}

export async function seedBooksTable(db: Database): Promise<void> { }
