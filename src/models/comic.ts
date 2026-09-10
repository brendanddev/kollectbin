export interface Comic {
    id: number;
    title: string;
    issue: number;
    volume: number;
    author: string;
    publisher: string;
    // genre: string;
    // isVariant: boolean;
}

export let comics: Comic[] = [];
