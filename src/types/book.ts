// Describes the shape of the Book types.

export interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    genre: string;
}
