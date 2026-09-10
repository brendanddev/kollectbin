import { Router } from "express";
import { createComic, getAllComics } from "../controllers/comic.controller.js";

const router = Router();

router.get('/', getAllComics);
router.post('/', createComic);

export default router;
