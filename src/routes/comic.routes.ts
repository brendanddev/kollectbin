import { Router } from "express";
import { createComic, getAllComics, getComicById, updateComicById, deleteComicById } from "../controllers/comic.controller.js";

const router = Router();

router.get('/', getAllComics);
router.get('/:id', getComicById);
router.post('/', createComic);
router.put('/:id', updateComicById);
router.delete('/:id', deleteComicById);

export default router;
