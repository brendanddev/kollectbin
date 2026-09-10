import type { Request, Response, NextFunction } from 'express';
import type { CreateComicInput } from '../types/comic.js';
import { findAllComics, createComic as insertComic } from '../models/comic.model.js';

export const createComic = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const newComicInput: CreateComicInput = {
            title: req.body.title,
            issue: req.body.issue,
            volume: req.body.volume,
            author: req.body.author,
            publisher: req.body.publisher,
            genre: req.body.genre,
            isVariant: req.body.isVariant,
            variantArtist: req.body.variantArtist
        };
        const newComic = await insertComic(newComicInput);
        return res.status(201).json({ status: "success", comic: newComic });
    } catch (error) {
        next(error);
    }
};

export const getAllComics = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const allComics = await findAllComics();
        return res.status(200).json(allComics);
    } catch (error) {
        next(error);
    }
};
