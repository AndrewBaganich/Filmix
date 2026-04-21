import { useEffect, useState } from "react";
import { getMovies } from "../../services/movieService.js";

export function useGetMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error("Помилка завантаження фільмів", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return [movies, loading, setMovies];
}
