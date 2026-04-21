import { useEffect, useState, useMemo } from "react"
import BackButton from "../CrudAdmin/BackButton"
import InputField from "../../../components/input"
import SelectField from "../../../components/selectField"
import TextAreaField from "../../../components/textArea"
import { createMovie } from "../../services/movieService.js"
import "./addMovie.css"

export default function AddMovieToDB() {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")

  const [posterFile, setPosterFile] = useState(null)
  const [movieFile, setMovieFile] = useState(null)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDraggingPoster, setIsDraggingPoster] = useState(false)

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      setSuccess("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [success])

  const posterPreview = useMemo(() => {
    if (!posterFile) return null
    return URL.createObjectURL(posterFile)
  }, [posterFile])

  useEffect(() => {
    return () => {
      if (posterPreview) {
        URL.revokeObjectURL(posterPreview)
      }
    }
  }, [posterPreview])

  const handlePosterChange = (file) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Постер має бути зображенням")
      return
    }

    setError("")
    setPosterFile(file)
  }

  const handleMovieChange = (file) => {
    if (!file) return

    if (!file.type.startsWith("video/")) {
      setError("Файл фільму має бути відео")
      return
    }

    setError("")
    setMovieFile(file)
  }

  const handlePosterDrop = (e) => {
    e.preventDefault()
    setIsDraggingPoster(false)

    const file = e.dataTransfer.files?.[0]
    handlePosterChange(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("Введіть назву фільму")
      return
    }

    if (!year || Number.isNaN(Number(year))) {
      setError("Введіть коректний рік")
      return
    }

    if (!type) {
      setError("Оберіть тип")
      return
    }

    if (!posterFile) {
      setError("Завантажте постер")
      return
    }

    if (!movieFile) {
      setError("Завантажте файл фільму")
      return
    }

    const formData = new FormData()
    formData.append("name", title.trim())
    formData.append("year", year)
    formData.append("type", type)
    formData.append("description", description.trim())
    formData.append("posterFile", posterFile)
    formData.append("movieFile", movieFile)

    try {
      setIsLoading(true)

      await createMovie(formData)

      setSuccess("Фільм успішно додано")
      setTitle("")
      setYear("")
      setType("")
      setDescription("")
      setPosterFile(null)
      setMovieFile(null)
    } catch (err) {
      setError(err.message || "Щось пішло не так")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="addMovie-page">
      <div className="addMovie-top-side">
        <BackButton text="Назад" />
        <h2 className="addMovie-title">Додати фільм в базу даних</h2>
      </div>

      <form onSubmit={handleSubmit} className="addMovie-layout">
        <div className="addMovie-left">
          <InputField
            label="Назва"
            value={title}
            onChange={setTitle}
            placeholder="Введіть назву фільму"
            className="addMovie-form"
            inputClassName="addMovie-input-bar"
          />

          <div className="addMovie-field">
            <InputField
              label="Рік"
              value={year}
              onChange={setYear}
              placeholder="Введіть рік випуску"
              type="number"
              className="addMovie-form2"
              inputClassName="addMovie-input-bar2"
            />

            <SelectField
              label="Тип"
              value={type}
              onChange={setType}
              className="addMovie-form2"
              options={[
                { value: "MOVIE", label: "Фільм" },
                { value: "SERIES", label: "Серіал" },
              ]}
            />
          </div>

          <TextAreaField
            label="Опис"
            value={description}
            onChange={setDescription}
            placeholder="Введіть опис фільму"
          />

          <div className="addMovie-form">
            <h3 className="addMovie-title-name">Файл фільму</h3>

            <label className="addMovie-file-upload">
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => handleMovieChange(e.target.files?.[0])}
              />
              <span className="addMovie-file-upload-text">
                {movieFile ? movieFile.name : "Обрати відеофайл"}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={`addMovie-submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Додавання..." : "Додати фільм"}
          </button>

          <div className="form-messages">
            {error && <p className="form-error">{error}</p>}
            {success && !error && <p className="form-success">{success}</p>}
          </div>
        </div>

        <div className="addMovie-right">
          <div className="addMovie-poster-card">
            <h3 className="addMovie-title-name">Постер</h3>

            <label
              className={`poster-dropzone ${isDraggingPoster ? "dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDraggingPoster(true)
              }}
              onDragLeave={() => setIsDraggingPoster(false)}
              onDrop={handlePosterDrop}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handlePosterChange(e.target.files?.[0])}
              />

              {!posterPreview ? (
                <div className="poster-dropzone-empty">
                  <span className="poster-dropzone-icon">＋</span>
                  <p className="poster-dropzone-title">Перетягни постер сюди</p>
                  <p className="poster-dropzone-subtitle">
                    або натисни, щоб обрати файл
                  </p>
                </div>
              ) : (
                <div className="poster-preview-wrap">
                  <img
                    src={posterPreview}
                    alt="Poster preview"
                    className="poster-preview-image"
                  />

                  <div className="poster-preview-overlay">
                    <span>Змінити постер</span>
                  </div>
                </div>
              )}
            </label>

            {posterFile && (
              <p className="poster-file-name">{posterFile.name}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}