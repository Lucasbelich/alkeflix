import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Detalle = () => {
  const [movieDetail, setMovieDetail] = useState(null);

  let token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=d70d39daab4d2c8f7e5707838ba2d54b&language=es-ES`;

    axios
      .get(endPoint)
      .then((response) => {
        const apiDetail = response.data;
        
        setMovieDetail(apiDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieID]);

  

  return (
    <div>
      {!token && <Navigate to="/" />}
      {!movieDetail && <h1>Cargando...</h1>}
      {movieDetail && (
        <div>
          <h1>{movieDetail.title}</h1>
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt={movieDetail.poster_path}
                className="img-fluid"
              />
            </div>
            <div className="col-8">
              <h6>
                Lanzamiento: {new Date(movieDetail.release_date).toLocaleDateString("es-ES")}
              </h6>
              <h5>Reseña</h5>
              <p>{movieDetail.overview}</p>
              <h5>{movieDetail.vote_average.toFixed(2)} / 10</h5>
              <h5>Generos</h5>
              <ul>
                {movieDetail.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detalle;
