import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB_IMITATE, DB_SERIES_IMITATE } from "../../../../DB_IMITATE.js";
import "./moviePage.css";

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allMovies = [...DB_IMITATE, ...DB_SERIES_IMITATE];

  const movie = useMemo(() => {
    return allMovies.find((item) => String(item.id) === String(id));
  }, [id, allMovies]);

  if (!movie) {
    return (
      <div className="moviePage">
        <button className="moviePage-back" onClick={() => navigate(-1)}>
          Назад
        </button>
        <h2 className="moviePage-notfound">Фільм не знайдено</h2>
      </div>
    );
  }

  return (
    <div className="moviePage">
      <button className="moviePage-back" onClick={() => navigate(-1)}>
        Назад
      </button>

      <div className="moviePage-card">
        <img
          src={movie.posterUrl}
          alt={movie.name}
          className="moviePage-poster"
        />

        <div className="moviePage-info">
          <h1>{movie.name}</h1>
          <p className="moviePage-meta">
            {movie.year} • {movie.type}
          </p>

          <p className="moviePage-description">
            {movie.description || "Опис поки відсутній"}
          </p>
        </div>
      </div>
    </div>
  );
}