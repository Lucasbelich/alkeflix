import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Link } from "react-router-dom";

const Resultados = (props) => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  console.log(keyword)

  const [movieResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=d70d39daab4d2c8f7e5707838ba2d54b&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        
        setMoviesResults(moviesArray);
      })
      .catch((err) => {
        console.log(err);
        swAlert(<h2>El contenido no esta disponible, intentalo mas tarde</h2>);
      });
  }, [keyword]); 

  return (
    <div>
      <h2>
        Buscaste: <em>{keyword}</em>
      </h2>
     <div className="row">
        {movieResults.map((movieCard, i) => {
          return (
            <div className="col-4" key={i}>
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
    </div>
  );
};
export default Resultados;
