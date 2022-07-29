import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navi = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      swAlert(<h2>Los campos no pueden estar vacios</h2>);
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert(
        <h2>Debes escribir una direccion de correo electronico valida</h2>
      );
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Credenciales invalidas</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swAlert(<h2>Ingresaste correctamente</h2>);
        const userToken = res.data.token;
        sessionStorage.setItem("token", userToken);
        navi("/listado");
      });
  };

  return (
    <>
      <div>
        <h1>Formulario de Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-label d-block mt-2">
            <span>Correo Electrónico:</span>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              
            />
          </label>
          <br />
          <label className="form-label d-block mt-2">
            <span>Contraseña:</span>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
            />
            <br />
            <button type="submit" className="btn btn-success mt-2">
              Ingresar
            </button>
          </label>
        </form>
      </div>
    </>
  );
};

export default Login;
