import path from "path";
import express from "express";
import mustacheExpress from "mustache-express";
import { type Application } from "express";
import { createComic, deleteExistingComic, editComic, getComic, getComics } from "./controllers/comic.js";

const __dirname = import.meta.dirname;

const app: Application = express();
app.use(express.json());

// Configure mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

app.get("/api/comics", getComics);
app.get("/api/comics/:id", getComic);
app.post("/api/comics", createComic);
app.put("/api/comics/:id", editComic);
app.delete("/api/comics/:id", deleteExistingComic);

export default app;
