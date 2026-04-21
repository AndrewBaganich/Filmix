import { NavLink } from "react-router-dom"
import "./crud.css"
import { useEffect, useState } from "react"
import { useGetMovies } from "./useGetMovies"
import { deleteMovie } from "../../services/movieService.js"
import { useNavigate } from "react-router-dom"

export default function AdminPanelCRUD() {
  const [moviesData, loading] = useGetMovies()
  const [movies, setMovies] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setMovies(moviesData)
  }, [moviesData])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Точно видалити фільм?")

    if (!confirmDelete) return

    try {
      await deleteMovie(id)
      setMovies((prev) => prev.filter((movie) => movie.id !== id))
      console.log("Фільм видалено")
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <div className="main">
        <h1 className="main-title">Movies/Series</h1>
        <NavLink to="/adminPanel/addMovie" className="main-add-movie-button">
          Додати
        </NavLink>
      </div>

      <div className="table-box">
        {loading && <p>Завантаження…</p>}

        {!loading && (
          <table className="table-of-movies">
            <thead>
              <tr>
                <th>Назва</th>
                <th>Тип</th>
                <th>Дії</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((element) => (
                <tr key={element.id}>
                  <td>{element.name}</td>
                  <td>{element.type}</td>

                  <td>
                    <button className="main-add-movie-button" onClick={() => navigate(`/adminPanel/editMovie/${element.id}`)}>
                      Редагувати
                    </button>

                    <button
                      className="main-add-movie-button"
                      onClick={() => handleDelete(element.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}

              {movies.length === 0 && (
                <tr>
                  <td colSpan="3" className="table-no-movies">
                    Немає фільмів
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}