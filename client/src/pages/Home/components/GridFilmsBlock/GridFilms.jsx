import "./gridFilms.css";
import { useNavigate } from "react-router-dom";

export default function GridFilms({ title, items = [] }) {
  
    const navigate = useNavigate();

  return (
    <section className="main">
      <h2 className="main-title">{title}</h2>

      <div className="main-grid">
        {items.map((element) => (
          <div
            className="main-film-box"
            key={element.id}
            onClick={() => navigate(`/home/movies/${element.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              className="main-poster"
              src={element.posterUrl}
              alt={element.name}
            />
            <div className="main-title-films">{element.name}</div>
            <div className="main-year-films">{element.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}