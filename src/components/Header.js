import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  let token = sessionStorage.getItem("token");

  return (
    <header>
      <nav className="navbar navbar-expand-xxl navbar-dark bg-dark">
        <div className="container">
          { token ? <Link className="navbar-brand" to="/listado">
            Alkeflix 
          </Link>: <Link className="navbar-brand" to="/">
          Alkeflix 
        </Link>}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={`${token ? "/listado" : "/"}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`${token ? "/listado" : "/"}`}>
                  Listado
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to={`${token ? "/favoritos" : "/"}`}>
                  Favoritos
                </Link>
              </li>
              </ul>
          </div>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
