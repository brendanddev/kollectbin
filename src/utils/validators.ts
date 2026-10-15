import { COMIC_GENRES, type ComicInput } from "../types/comic.js";

// Validation used across the project.

export function parseIdParam(comicId: string): number | null {
    const parsedId = Number(comicId);

    if (!Number.isInteger(parsedId) || parsedId < 0) return null;
    return parsedId;
}

export function validateComicInput(comic: ComicInput): boolean {
    if (!comic || typeof comic !== 'object') return false;

    if (typeof comic.title !== 'string' || comic.title.trim() === '') return false;
    if (!Number.isInteger(comic.volume) || comic.volume < 0) return false;
    if (!Number.isInteger(comic.issue) || comic.issue < 0) return false;
    if (typeof comic.author !== 'string' || comic.author.trim() === '') return false;
    if (typeof comic.publisher !== 'string' || comic.publisher.trim() === '') return false;

    if (comic.year !== undefined) {
        if (!Number.isInteger(comic.year) || comic.year < 0) return false;
    }

    if (!COMIC_GENRES.includes(comic.genre)) return false;

    return true;
}
