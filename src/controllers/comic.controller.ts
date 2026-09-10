import type { Request, Response, NextFunction } from 'express';
import type { Comic } from '../types/comic.js';
import { comics } from '../types/comic.js';

export const createComic = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, issue, volume, author, publisher } = req.body;
        // const newComic: Comic = { id: Date.now(), title, issue, volume, author, publisher };
        // comics.push(newComic);
        // return res.status(201).json(newComic);
    } catch (error) {
        next(error);
    }
};

export const getComics = (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(comics);
    } catch (error) {
        next(error);
    }
};
