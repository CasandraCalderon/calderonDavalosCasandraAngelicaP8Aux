import React, { useReducer } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3002/user";
const cookies = new Cookies();
const initialState = {
  email: "",
  password: "",
};

function reducer(state, action) {
  return { ...state, [action.input]: action.value };
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    const action = {
      input: e.target.name,
      value: e.target.value,
    };
    dispatch(action);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      /^[a-zA-Z0-9_.+-]+@(gmail|hotmail|yahoo)+\.[com]+$/.test(state.email) &&
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)
    ) {
      alert("bienvenido");
      //iniciarSesion();
    } else {
      alert("Los datos no cumplen los parametros");
      document.location.reload();
    }
  }

  const iniciarSesion = async () => {
    await axios
      .get(baseUrl, {
        params: {
          email: state.email,
          password: state.password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("email", respuesta.email, { path: "/" });
          alert(`Bienvenido ${respuesta.email}`);
          window.location.href = "./ventas";
          
        } else {
          alert("El usuario o la contraseña no son correctos");
          document.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <h1>LOGIN</h1>
        <div className="form-group">
          <label>Email: </label>
          <br />
          <input
            type="email"
            className="form-control"
            placeholder="example@example.com"
            aria-label="example@example.com"
            name="email"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            Only Gmail, Hotmail and Yahoo type emails are accepted
          </div>
          <br />

          <label>Password: </label>
          <br />
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            Must contain at least 8 characters, letters and numbers
          </div>
          <br />
          <button className="btn btn-dark" onClick={()=> iniciarSesion()}>
            Enter!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
