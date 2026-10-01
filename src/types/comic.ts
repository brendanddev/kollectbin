export type ComicGenre = 'Fantasy' | 'Action' | 'Mystery';

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
