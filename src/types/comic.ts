// Describes the shape of the Comic types.

export const COMIC_GENRES = ['Fantasy', 'Action', 'Mystery'] as const;
export type ComicGenre = typeof COMIC_GENRES[number];

export interface Comic {
    id: number;
    title: string;
    volume: number;
    issue: number;
    author: string;
    publisher: string;
    year?: number;
    genre: ComicGenre
}

export type ComicInput = Omit<Comic, 'id'>;
export type UpdateComic = Partial<ComicInput>;

export interface ComicFilterOptions {
    title?: string;
    volMax?: number;
    volMin?: number;
}
