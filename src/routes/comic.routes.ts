import { Router } from "express";
import { createComic, getComics } from "../controllers/comic.controller.js";

const router = Router();

router.get('/', getComics);
router.post('/', createComic);

export default router;
