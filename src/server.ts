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

// Routes
app.get("/api/comics", getComics);
app.get("/api/comics/:id", getComic);
app.post("/api/comics", createComic);
app.put("/api/comics/:id", editComic);
app.delete("/api/comics/:id", deleteExistingComic);

// app.get("/api/user", getUser);
// app.post("/api/user", insertUser);
// app.put("/api/user/:id", updateUser);
// app.delete("/api/user/:id", removeUser);

export default app;
