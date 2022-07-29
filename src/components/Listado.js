import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import "./css/App.css"

const Listado = (props) => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([]);

  

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=d70d39daab4d2c8f7e5707838ba2d54b&language=es-ES&page=1";
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMoviesList(apiData.results);
      })
      .catch((err) => {
        swAlert(<h2>El contenido no esta disponible, intentalo mas tarde</h2>);
      });
  }, [setMoviesList]);

  return (
    <div className="row">
      {moviesList.map((movieCard, i) => {
        return (
          <div className="col-3" key={i}>
            <div className="card my-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieCard.poster_path}`}
                alt={movieCard.poster_path}
                className="card-img-top"
              />
              <button className="favourite-btn" onClick={props.addOrRemoveFavs} data-movie-id={movieCard.id}>{props.favorite.find(movie => movie.id == movieCard.id) ? "❤️" : "🤍"}</button>
              <div className="card-body">
                <h5 className="card-title">{movieCard.title}</h5>
                <p className="card-text">
                  {movieCard.overview.substring(0, 100)}...
                </p>
                <Link
                  to={`/detalle?movieID=${movieCard.id}`}
                  className="btn btn-primary"
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listado;
