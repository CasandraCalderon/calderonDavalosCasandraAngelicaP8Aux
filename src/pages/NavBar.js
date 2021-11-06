import React from "react";
import Cookies from "universal-cookie";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

const cookies = new Cookies();
const NavBar = () => {
  const cerrarSesion = () => {
    cookies.remove("email", { path: "/" });
    window.location.href = "./";
  };
  return (
    <Router>
      <div>
        <Navbar
          bg="dark"
          variant="dark"
          sticky="top"
          expend="sm"
          collapseOnSelect
        >
          <Navbar.Brand>{cookies.get("email")}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse></Navbar.Collapse>
          <button
            onClick={() => cerrarSesion()}
            type="button"
            className="btn btn-secondary"
          >
            Cerrar Sesion
          </button>
        </Navbar>
      </div>
    </Router>
  );
};
export default NavBar;
