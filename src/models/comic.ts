import type { Database } from "sqlite";
import type { Comic, ComicInput } from "../types/comic.js";

// Data access layer for the `comics` table. Each function runs one SQL
// query and returns the result, there is no HTTP or validation here.

export async function getAllComics(db: Database): Promise<Comic[]> {
    return await db.all<Comic[]>(`SELECT * FROM comics`);
}

export async function getComicById(db: Database, id: number): Promise<Comic | undefined> {
    return await db.get<Comic>(`SELECT * FROM comics WHERE id = ?`, id);
}

// Uses `db.get<T>` and `RETURNING` to return the newly inserted row
export async function insertComic(db: Database, comic: ComicInput): Promise<Comic | undefined> {
    return await db.get<Comic>(`
        INSERT INTO comics(title, volume, issue, author, publisher, year, genre)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *`,
        comic.title, comic.volume, comic.issue, comic.author, comic.publisher, 
        comic.year, comic.genre
    );
}

export async function updateComic(db: Database, id: number, comic: ComicInput): Promise<Comic | undefined> { 
    return await db.get<Comic>(`
        UPDATE comics
        SET title = ?, volume = ?, issue = ?, author = ?, publisher = ?, year = ?, genre = ?
        WHERE id = ?
        RETURNING *`,
        comic.title, comic.volume, comic.issue, comic.author, comic.publisher, 
        comic.year, comic.genre, id
    );
}

export async function deleteComic(db: Database, id: number): Promise<Comic | undefined> { 
    return await db.get<Comic>(`
        DELETE FROM comics
        WHERE id = ?
        RETURNING *`,
        id
    );
}

