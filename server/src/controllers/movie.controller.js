import MovieServise from "../services/movie.services.js";

const movieService = new MovieServise();

export const createMovie = async (req, res) => {
  try {
    const film = await movieService.createMovie({
      body: req.body,
      poster: req.files?.posterFile?.[0] || null,
      movie: req.files?.movieFile?.[0] || null,
    });

    return res.status(201).json(film);
  } catch (err) {
    return res.status(500).json({
      message: "Movie is not created.",
      error: err.message,
    });
  }
};

export const getMovies = async (req, res) => {
  try {
    const films = await movieService.getAllfilms();
    return res.status(200).json(films);
  } catch (err) {
    return res.status(400).json({
      message: "Failed to load movies.",
      error: err.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedMovie = await movieService.deleteMovie(id);
    return res.status(200).json(deletedMovie);
  } catch (err) {
    return res.status(404).json({
      message: "Film is not found.",
      error: err.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const movieById = await movieService.getMovieById(id);

    if (!movieById) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movieById);
  } catch (err) {
    return res.status(404).json({
      message: "Movie not found",
      error: err.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  const id = Number(req.params.id);

  try {
    console.log("PATCH body:", req.body);
    console.log("PATCH files:", req.files);

    const updatedMovie = await movieService.updateMovie(id, {
      body: req.body,
      poster: req.files?.posterFile?.[0] || null,
      movie: req.files?.movieFile?.[0] || null,
    });

    return res.status(200).json(updatedMovie);
  } catch (err) {
    console.error("UPDATE MOVIE ERROR:", err);

    return res.status(500).json({
      message: "Failed to update movie",
      error: err.message,
    });
  }
};
