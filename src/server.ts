import express, { type Application, type Request, type Response } from "express";
import { PORT } from "./config.js";
import { deleteComic, getAllComics, getComicById, insertComic, updateComic } from "./db.js";
import type { ComicInput, UpdateComic } from "./types/comic.js";

const app: Application = express();
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello, from Kollectbin!');
});

app.get('/comics', async (req: Request, res: Response): Promise<void> => {
    const allComics = await getAllComics();
    res.json({ comics: allComics });
});

app.get('/comics/:id', async (req: Request, res: Response): Promise<void> => {
    const comicId = Number(req.params.id);
    const comic = await getComicById(comicId);
    res.json({ comic: comic });
});

app.post('/comics', async (req: Request, res: Response): Promise<void> => {
    const { title, volume, issue, author, publisher, year, genre } = req.body;
    const comic: ComicInput = { title, volume, issue, author, publisher, year, genre };
    await insertComic(comic);
    res.json({ comic: comic });
});

app.put('/comics/:id', async (req: Request, res: Response): Promise<void> => {
    const comicId = Number(req.params.id);

    const { title, volume, issue, author, publisher, year, genre } = req.body;
    const updatedComic: ComicInput = { title, volume, issue, author, publisher, year, genre };
    const result = await updateComic(comicId, updatedComic);
    if (result) {
        res.json({ comic: updateComic });
    } else {
        res.status(400).json({ status: "Error" });
    }
});

app.delete('/comics/:id', async (req: Request, res: Response): Promise<void> => {
    const comicId = Number(req.params.id);
    await deleteComic(comicId);
    res.status(204).json({ status: "deleted" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
