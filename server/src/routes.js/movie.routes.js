import { Router } from "express";
import { createMovie, getMovies, deleteMovie, getMovieById, updateMovie} from "../controllers/movie.controller.js";
import { uploadToMemory } from "../middlewares/uploadMemory.js";
import { validateMovieCreate } from "../middlewares/middleware.js";
import { validateMovieUpdate } from "../middlewares/middleware.js";

const router = Router();

//CRUD
router.post("/", uploadToMemory, validateMovieCreate, createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.delete("/:id", deleteMovie);
router.patch("/:id", uploadToMemory, validateMovieUpdate, updateMovie);

export default router;