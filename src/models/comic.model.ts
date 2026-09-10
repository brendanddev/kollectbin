import pool from "../db/pool.js";
import type { Comic, CreateComicInput, UpdateComicInput } from "../types/comic.js";

const RETURN_COMIC_COLUMNS = 'comic_id, title, issue, volume, author, publisher, genre, is_variant, variant_artist';

export const createComic = async (fields: CreateComicInput): Promise<Comic | undefined> => {
    const result = await pool.query(`
        INSERT INTO comics(title, issue, volume, author, publisher, genre, is_variant, variant_artist)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING ${RETURN_COMIC_COLUMNS}`,
        [fields.title, fields.issue, fields.volume, fields.author, fields.publisher, fields.genre, 
            fields.isVariant, fields.variantArtist]
    );
    return result.rows[0];
};

export const findAllComics = async (): Promise<Comic[]> => {
    const result = await pool.query(`
        SELECT ${RETURN_COMIC_COLUMNS}
        FROM comics
        ORDER BY title`
    );
    return result.rows;
};

export const findComicById = async (comicId: number): Promise<Comic | undefined> => {
    const result = await pool.query(`
        SELECT ${RETURN_COMIC_COLUMNS}
        FROM comics
        WHERE comic_id = $1`,
        [comicId]
    );
    return result.rows[0];
};

export const updateComic = async (comicId: number, fields: UpdateComicInput): Promise<Comic | undefined> => {
    const result = await pool.query(`
        UPDATE comics
        SET title = $1,
            issue = $2,
            volume = $3, 
            author = $4,
            publisher = $5,
            genre = $6,
            is_variant = $7,
            variant_artist = $8
        WHERE comic_id = $9
        RETURNING ${RETURN_COMIC_COLUMNS}`,
        [fields.title, fields.issue, fields.volume, fields.author, fields.publisher, 
            fields.genre, fields.isVariant, fields.variantArtist, comicId]
    );
    return result.rows[0];
};

export const deleteComic = async (comicId: number): Promise<Comic | undefined> => {
    const result = await pool.query(`
        DELETE FROM comics
        WHERE comic_id = $1
        RETURNING ${RETURN_COMIC_COLUMNS}`,
        [comicId]
    );
    return result.rows[0];
};
