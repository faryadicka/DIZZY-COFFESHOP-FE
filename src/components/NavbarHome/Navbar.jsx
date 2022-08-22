import React from "react";
import { Link, useNavigate } from "react-router-dom";

// assets
import "../Navbar/Navbar.scoped.css";
import Logo from "../../assets/img/logo.png";
// import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function Navbar() {
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-products navbar-costum">
      <div className="container py-3">
        <Link className="navbar-brand brand" to="#">
          <img src={Logo} alt="logo-brand" /> Dizzy Coffee Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-auto" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payment">
                Your Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                History
              </Link>
            </li>
          </ul>
          <div className="row justify-content-md-none justify-content-center">
            <div className="col-4 col-md-5">
              <button
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="btn"
              >
                Login
              </button>
            </div>
            <div className="col-4 col-md-2 ps-4">
              <button
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="btn btn-warning rounded-4"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
