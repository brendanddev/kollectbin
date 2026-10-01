import path from "path";
import express from "express";
import mustacheExpress from "mustache-express";
import { type Application, type Request, type Response } from "express";
import { PORT } from "./config/config.js";
import { deleteComic, getAllComics, getComicById, insertComic, updateComic } from "./db.js";
import type { ComicInput, UpdateComic } from "./types/comic.js";

const __dirname = import.meta.dirname;

const app: Application = express();
app.use(express.json());

// Configure mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

app.get('/', async (req: Request, res: Response): Promise<void> => {
    const allComics = await getAllComics();
    res.render('index', { allComics });
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
