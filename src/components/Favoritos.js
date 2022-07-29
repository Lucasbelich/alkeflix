
import {Link, Navigate} from "react-router-dom";

const Favoritos = ({favorite, addOrRemoveFavs}) => {
  

  return (
    <div>
    {!favorite.length && <Navigate to="/listado" />}
      <div className="row">
        {favorite.map((movieCard, i) => {
          return (
            <div className="col-3" key={i}>
              <div className="card my-4">
                <img
                  src={movieCard.imgURL}
                  alt={movieCard.imgURL}
                  className="card-img-top"
                />
                <button
                  className="favourite-btn"
                  onClick={addOrRemoveFavs}
                  data-movie-id={movieCard.id}
                >
                  🤍
                </button>
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

export default Favoritos;
