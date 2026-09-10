import { Router } from "express";
import { createComic, getComics } from "../controllers/comicController.js";

const router = Router();

router.get('/', getComics);
router.post('/', createComic);

export default router;
