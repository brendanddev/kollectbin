import type { Request, Response } from "express";
import { initDatabase } from "../db.js";
import { deleteComic, getAllComics, getComicById, insertComic, updateComic } from "../models/comic.js";
import type { ComicInput } from "../types/comic.js";

// Controller logic for the app. Each handler receives an HTTP request, validates the input,
// calls the model, and sends back the response.

const db = await initDatabase();

export async function getComics(req: Request, res: Response): Promise<void> { 
    const allComics = await getAllComics(db);
    res.json({ message: "success", comics: allComics });
}

export async function getComic(req: Request, res: Response): Promise<void> { 
    const comicId = Number(req.params.id);
    const comic = await getComicById(db, comicId);
    if (!comic) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.json({ message: "success", comic: comic });
}

export async function createComic(req: Request, res: Response): Promise<void> { 
    const newComic: ComicInput = req.body;
    try {
        const result = await insertComic(db, newComic);
        res.status(201).json({ message: "success", comic: result });
    } catch (err) {
        res.status(400).json({ message: "Bad request" });
    }
}

export async function editComic(req: Request, res: Response): Promise<void> { 
    const comicId = Number(req.params.id);
    const updatedComic: ComicInput = req.body;
    try {
        const result = await updateComic(db, comicId, updatedComic);
        if (!result) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json({ message: "success", comic: result });
    } catch (err) {
        res.status(400).json({ message: "Bad request" });
    }
}

export async function deleteExistingComic(req: Request, res: Response): Promise<void> { 
    const comicId = Number(req.params.id);
    try {
        const result = await deleteComic(db, comicId);
        if (!result) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json({ message: "success", comic: result });
    } catch (err) {
        res.status(400).json({ message: "Bad request" });
    }
}
