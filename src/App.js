import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

import "./components/css/bootstrap.min.css";

function App() {
  const [favorite, setFavorite] = useState([]);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const favMovies = localStorage.getItem("favs");
    if (favMovies !== null) {
      const favsArray = JSON.parse(favMovies);
      setFavorite(favsArray);
    }
  }, []);

  const addOrRemoveFavs = (e) => {
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;
    

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const id = btn.dataset.movieId;
    
    const movieData = { imgURL, title, overview, id };

    let moviesInArray = tempMoviesInFavs.find(
      (movie) => movie.id === movieData.id
    );
    if (!moviesInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorite(tempMoviesInFavs);

      console.log("se agrego la pelicula");
    } else {
      let moviesLeft = tempMoviesInFavs.filter(
        (movie) => movie.id !== movieData.id
      );
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorite(moviesLeft);

      console.log("se elimino la pelicula");
    }
  };

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/listado"
          element={<Listado addOrRemoveFavs={addOrRemoveFavs} favorite={favorite}/>}
        />
        <Route path="/detalle" element={<Detalle />} />
        <Route
          path="/resultados"
          element={
            <Resultados addOrRemoveFavs={addOrRemoveFavs} favorite={favorite} />
          }
        />
        <Route
          path="/favoritos"
          element={
            <Favoritos addOrRemoveFavs={addOrRemoveFavs} favorite={favorite} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
