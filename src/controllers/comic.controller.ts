import type { Request, Response, NextFunction } from 'express';
import type { CreateComicInput, UpdateComicInput } from '../types/comic.js';
import { deleteComic, findAllComics, findComicById, createComic as insertComic, updateComic } from '../models/comic.model.js';
import { parseIdParam } from '../utils/validate.js';

export const createComic = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
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
        res.status(201).json({ status: "success", comic: newComic });
    } catch (error) {
        next(error);
    }
};

export const getAllComics = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const allComics = await findAllComics();
        res.status(200).json(allComics);
    } catch (error) {
        next(error);
    }
};

export const getComicById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const comicId = parseIdParam(req.params.id);
        if (comicId === null) {
            res.status(400).json({ status: 'fail', message: 'A valid comic ID is required' });
            return;
        }

        const comic = await findComicById(comicId);
        res.status(200).json({ status: 'success', comic: comic });
    } catch (error) {
        next(error);
    }
};

export const updateComicById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newComicInput: UpdateComicInput = {
            title: req.body.title,
            issue: req.body.issue,
            volume: req.body.volume,
            author: req.body.author,
            publisher: req.body.publisher,
            genre: req.body.genre,
            isVariant: req.body.isVariant,
            variantArtist: req.body.variantArtist
        };

        const targetComicId = parseIdParam(req.params.id);
        if (targetComicId === null) {
            res.status(400).json({ status: 'fail', message: 'A valid comic ID is required' });
            return;
        }

        const comic = await updateComic(targetComicId, newComicInput);
        res.status(200).json({ status: 'success', comic: comic });

    } catch (error) {
        next(error);
    }
};

export const deleteComicById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const targetComicId = parseIdParam(req.params.id);
        if (targetComicId === null) {
            res.status(400).json({ status: 'fail', message: 'A valid comic ID is required' });
            return;
        }

        const comic = await deleteComic(targetComicId);
        res.status(200).json({ status: 'success', comic: comic });
    } catch (error) {
        next(error);
    }
};
