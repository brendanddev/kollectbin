import type { Database } from "sqlite";
import type { Comic, ComicFilterOptions, ComicInput } from "../types/comic.js";

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

export async function getFilteredComics(db: Database, options: ComicFilterOptions): Promise<Comic[]> {
    let query = `SELECT * FROM comics WHERE 1=1`;
    const values = [];

    if (options.title) {
        values.push(`%${options.title}%`);
        query += ` AND title LIKE ?`;
    }

    if (options.volMax !== undefined) {
        values.push(options.volMax);
        query += ` AND volume <= ?`;
    }

    if (options.volMin !== undefined) {
        values.push(options.volMin);
        query += ` AND volume >= ?`;
    }

    return await db.all<Comic[]>(query, ...values);
}
