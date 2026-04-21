import { useEffect, useMemo, useState } from "react";
import "./editMovie.css";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./BackButton";
import {
  buildFileUrl,
  getMovieById,
  updateMovie,
} from "../../services/movieService.js";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("MOVIE");
  const [description, setDescription] = useState("");

  const [posterPath, setPosterPath] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [movieFile, setMovieFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);

        setTitle(data.name || data.title || "");
        setYear(data.year ? String(data.year) : "");
        setType(data.type || "MOVIE");
        setDescription(data.description || "");
        setPosterPath(data.posterUrl || "");
      } catch (err) {
        setError(err.message || "Не вдалося завантажити фільм");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!success) return undefined;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const previewPoster = useMemo(() => {
    if (posterFile) return URL.createObjectURL(posterFile);
    return buildFileUrl(posterPath);
  }, [posterFile, posterPath]);

  useEffect(() => {
    return () => {
      if (posterFile && previewPoster?.startsWith("blob:")) {
        URL.revokeObjectURL(previewPoster);
      }
    };
  }, [posterFile, previewPoster]);

  const handlePosterChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Постер має бути зображенням");
      return;
    }

    setError("");
    setPosterFile(file);
  };

  const handleMovieChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Файл фільму має бути відео");
      return;
    }

    setError("");
    setMovieFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handlePosterChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Введіть назву");
      return;
    }

    if (!year || Number.isNaN(Number(year))) {
      setError("Введіть коректний рік");
      return;
    }

    if (!type) {
      setError("Оберіть тип");
      return;
    }

    try {
      setIsSaving(true);

      if (posterFile || movieFile) {
        const formData = new FormData();
        formData.append("name", title.trim());
        formData.append("year", year);
        formData.append("type", type);
        formData.append("description", description.trim());

        if (posterFile) {
          formData.append("posterFile", posterFile);
        }

        if (movieFile) {
          formData.append("movieFile", movieFile);
        }

        const updatedMovie = await updateMovie(id, formData, true);
        setPosterPath(updatedMovie.posterUrl || posterPath);
      } else {
        await updateMovie(id, {
          name: title.trim(),
          year: Number(year),
          type,
          description: description.trim(),
        });
      }

      setPosterFile(null);
      setMovieFile(null);
      setSuccess("Фільм оновлено");
    } catch (err) {
      setError(err.message || "Не вдалося оновити фільм");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <p className="editMovie-loading">Завантаження...</p>;
  }

  return (
    <div className="editMovie-page">
      <div className="editMovie-top">
        <BackButton text="Назад" onClick={() => navigate(-1)} />
        <h2 className="editMovie-title">Редагування фільму</h2>
      </div>

      <form className="editMovie-layout" onSubmit={handleSubmit}>
        <div className="editMovie-left">
          <div>
            <p className="editMovie-label">Назва</p>
            <input
              className="editMovie-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <p className="editMovie-label">Рік</p>
            <input
              className="editMovie-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="number"
            />
          </div>

          <div>
            <p className="editMovie-label">Тип</p>
            <select
              className="editMovie-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="MOVIE">Фільм</option>
              <option value="SERIES">Серіал</option>
            </select>
          </div>

          <div>
            <p className="editMovie-label">Опис</p>
            <textarea
              className="editMovie-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <p className="editMovie-label">Новий відеофайл</p>
            <label className="editMovie-fileUpload">
              <input
                type="file"
                hidden
                accept="video/*"
                onChange={(e) => handleMovieChange(e.target.files?.[0])}
              />
              <span>{movieFile ? movieFile.name : "Обрати новий відеофайл"}</span>
            </label>
          </div>

          <button type="submit" className="editMovie-submit" disabled={isSaving}>
            {isSaving ? "Зберігаю..." : "Зберегти"}
          </button>

          {error && <p className="editMovie-error">{error}</p>}
          {success && <p className="editMovie-success">{success}</p>}
        </div>

        <div className="editMovie-right">
          <p className="editMovie-label">Постер</p>

          <label
            className={`poster-dropzone ${isDragging ? "dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handlePosterChange(e.target.files?.[0])}
            />

            {previewPoster ? (
              <div className="poster-preview-wrap">
                <img src={previewPoster} alt="Poster" className="poster-image" />
                <div className="poster-overlay">
                  <span>Змінити постер</span>
                </div>
              </div>
            ) : (
              <div className="poster-empty">
                <span className="poster-empty-icon">＋</span>
                <p>Перетягни постер сюди</p>
                <small>або натисни, щоб обрати</small>
              </div>
            )}
          </label>
        </div>
      </form>
    </div>
  );
}
