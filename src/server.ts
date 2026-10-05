import path from "path";
import express from "express";
import mustacheExpress from "mustache-express";
import { type Application, type Request, type Response } from "express";
import { PORT } from "./config/config.js";
import type { ComicInput, UpdateComic } from "./types/comic.js";

const __dirname = import.meta.dirname;

const app: Application = express();
app.use(express.json());

// Configure mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
