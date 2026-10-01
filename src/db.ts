import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { DATABASE_NAME } from "./config/config.js";
import type { Comic, ComicInput, UpdateComic } from "./types/comic.js";

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
    if (db) return db;

    db = await open({
        filename: DATABASE_NAME,
        driver: sqlite3.Database
    });
    await createTable();
    await seedDatabase();
    return db;
};

async function createTable(): Promise<void> {
    const db = await getDatabase();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS comics (
            id INTEGER NOT NULL PRIMARY KEY,
            title TEXT NOT NULL,
            volume INTEGER NOT NULL,
            issue INTEGER NOT NULL,
            author TEXT NOT NULL,
            publisher TEXT NOT NULL,
            year INTEGER,
            genre TEXT NOT NULL CHECK (genre IN ('Fantasy', 'Action', 'Mystery'))
        )
    `);
}

async function seedDatabase(): Promise<void> {
    const db = await getDatabase();
    await db.run(`
        INSERT INTO comics (title, volume, issue, author, publisher, year, genre)
        VALUES
            ('The Amazing Spider-Man', 1, 1, 'Stan Lee, Steve Ditko', 'Marvel', 1963, 'Action'),
            ('Fantastic Four', 1, 1, 'Stan Lee, Jack Kirby', 'Marvel', 1961, 'Action'),
            ('Daredevil', 1, 1, 'Stan Lee, Bill Everett', 'Marvel', 1964, 'Action')
    `);
}

export async function getAllComics(): Promise<Comic[]> {
    const db = await getDatabase();
    return await db.all<Comic[]>(`SELECT * FROM comics`);
}

export async function getComicById(id: number): Promise<Comic | undefined> {
    const db = await getDatabase();
    return await db.get("SELECT * FROM comics WHERE id = ?", id);
}

export async function insertComic(comic: ComicInput): Promise<void> { 
    const db = await getDatabase();
    await db.run(
        "INSERT INTO comics (title, volume, issue, author, publisher, year, genre) VALUES (?, ?, ?, ?, ?, ?, ?)",
        comic.title, comic.volume, comic.issue,
        comic.author, comic.publisher, comic.year, comic.genre
    );
}

export async function updateComic(id: number, c: ComicInput): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run(
        `UPDATE comics
         SET title = ?, volume = ?, issue = ?, author = ?, publisher = ?, year = ?, genre = ?
         WHERE id = ?`,
        c.title, c.volume, c.issue, c.author, c.publisher, c.year ?? null, c.genre, id
    );
    return (result.changes ?? 0) > 0;
}

export async function deleteComic(id: number): Promise<void> { 
    const db = await getDatabase();
    await db.run("DELETE FROM comics WHERE id = ?", id);
}
