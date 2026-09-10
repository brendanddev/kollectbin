export interface Comic {
    id: number;
    title: string;
    issue: number;
    volume: number;
    author: string;
    publisher: string;
    genre: string;
    isVariant: boolean;
    variantArtist?: string;
}

export type CreateComicInput = Omit<Comic, 'id'>;

export type UpdateComicInput = CreateComicInput;
