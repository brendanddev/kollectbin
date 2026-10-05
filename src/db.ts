import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { DATABASE_NAME } from "./config/config.js";

// Opens a new database connection using sqlite3 as the driver, 
// creating the file if it dosent exist.
export async function initDatabase(): Promise<Database> {
    const db = await open({
        filename: DATABASE_NAME,
        driver: sqlite3.Database
    });
    createTable(db);
    seedDatabase(db);
    return db;
}

export async function createTable(db: Database): Promise<void> {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS comics (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            volume INTEGER NOT NULL,
            issue INTEGER NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT NOT NULL,
            year INTEGER NOT NULL,
            genre TEXT NOT NULL CHECK (genre IN ('Fantasy', 'Action', 'Mystery'))
        );
    `);
}

async function seedDatabase(db: Database): Promise<void> {
    const row = await db.get<{ count: number }>(`SELECT COUNT(*) AS count FROM comics`);
    if (row && row.count > 0) return;

    await db.run(`
        INSERT INTO comics (title, volume, issue, author, publisher, year, genre)
        VALUES
            ('The Amazing Spider-Man', 1, 1, 'Stan Lee, Steve Ditko', 'Marvel', 1963, 'Action'),
            ('Fantastic Four', 1, 1, 'Stan Lee, Jack Kirby', 'Marvel', 1961, 'Action'),
            ('Daredevil', 1, 1, 'Stan Lee, Bill Everett', 'Marvel', 1964, 'Action'),
            ('The Sandman', 1, 1, 'Neil Gaiman, Sam Kieth', 'DC', 1989, 'Fantasy'),
            ('Saga', 1, 1, 'Brian K. Vaughan, Fiona Staples', 'Image', 2012, 'Fantasy'),
            ('Batman: The Long Halloween', 1, 1, 'Jeph Loeb, Tim Sale', 'DC', 1996, 'Mystery'),
            ('Hellblazer', 1, 1, 'Jamie Delano, John Ridgway', 'DC', 1988, 'Mystery')
    `);
}
