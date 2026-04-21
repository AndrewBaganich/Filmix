import prisma from "../config/prisma.js";
import fs from "fs/promises";
import path from "path";

const normalizeStoredPath = (filePath) => {
  if (!filePath) return null;
  return filePath.replaceAll("\\", "/");
};

const deleteFileIfExists = async (filePath) => {
  if (!filePath) return;

  const normalized = normalizeStoredPath(filePath);
  const absolutePath = path.isAbsolute(normalized)
    ? normalized
    : path.resolve(normalized);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const buildMovieData = (body, existingMovie = null) => ({
  name: body.name ?? body.title ?? existingMovie?.name,
  description: body.description ?? existingMovie?.description ?? null,
  year: body.year ? Number(body.year) : existingMovie?.year,
  type: body.type ?? existingMovie?.type,
});

class MovieServise {
  async createMovie({ body, poster, movie }) {
    if (!poster || !movie) {
      throw new Error("Poster and movie files are required");
    }

    return prisma.movie.create({
      data: {
        ...buildMovieData(body),
        posterUrl: normalizeStoredPath(poster.path),
        videoUrl: normalizeStoredPath(movie.path),
      },
    });
  }

  async deleteMovie(id) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    await deleteFileIfExists(movie.videoUrl);
    await deleteFileIfExists(movie.posterUrl);

    return prisma.movie.delete({
      where: { id: movie.id },
    });
  }

  async getAllfilms() {
    return prisma.movie.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getMovieById(id) {
    return prisma.movie.findUnique({
      where: { id },
    });
  }

  async updateMovie(id, { body, poster, movie }) {
    const existingMovie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw new Error("Movie not found");
    }

    const updatedData = buildMovieData(body, existingMovie);

    if (poster) {
      await deleteFileIfExists(existingMovie.posterUrl);
      updatedData.posterUrl = normalizeStoredPath(poster.path);
    }

    if (movie) {
      await deleteFileIfExists(existingMovie.videoUrl);
      updatedData.videoUrl = normalizeStoredPath(movie.path);
    }

    return prisma.movie.update({
      where: { id },
      data: updatedData,
    });
  }
}

export default MovieServise;
