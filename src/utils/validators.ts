import { COMIC_GENRES, type ComicInput } from "../types/comic.js";

// Validation used across the project.

export function parseIdParam(comicId: string): number | null {
    const parsedId = Number(comicId);

    if (!Number.isInteger(parsedId) || parsedId < 0) return null;
    return parsedId;
}

export function validateComicInput(comic: ComicInput): boolean {
    if (comic === undefined) return false;

    if (!comic.title) return false;
    if (typeof comic.title !== 'string') return false;
    if (comic.title.trim() == '') return false;

    if (!comic.volume) return false;
    if (typeof comic.volume !== 'number') return false;
    if (comic.volume < 0) return false;

    if (!comic.issue) return false;
    if (typeof comic.issue !== 'number') return false;
    if (comic.issue < 0) return false;

    if (!comic.author) return false;
    if (typeof comic.author !== 'string') return false;
    if (comic.author.trim() == '') return false;

    if (!comic.publisher) return false;
    if (typeof comic.publisher !== 'string') return false;
    if (comic.publisher.trim() == '') return false;

    if (comic.year) {
        if (typeof comic.year !== 'number') return false;
        if (comic.year < 0) return false;
    }

    if (!comic.genre) return false;
    if (!COMIC_GENRES.includes(comic.genre)) return false;

    return true;
}



// export type ComicGenre = 'Fantasy' | 'Action' | 'Mystery';

// export interface Comic {
//     id: number;
//     title: string;
//     volume: number;
//     issue: number;
//     author: string;
//     publisher: string;
//     year?: number;
//     genre: ComicGenre
// }

// export type ComicInput = Omit<Comic, 'id'>;
// export type UpdateComic = Partial<ComicInput>;


// export async function createComic(req: Request, res: Response): Promise<void> { 
//     const newComic: ComicInput = req.body;
//     try {
//         const result = await insertComic(db, newComic);
//         res.status(201).json({ message: "success", comic: result });
//     } catch (err) {
//         res.status(400).json({ message: "Bad request." });
//     }
// }