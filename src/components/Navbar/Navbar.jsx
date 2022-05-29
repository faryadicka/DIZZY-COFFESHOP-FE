import React from "react";
import { Link, useNavigate } from "react-router-dom";

// assets
import "../Navbar/Navbar.scoped.css";
import Logo from "../../assets/img/logo.png";
import Search from "../../assets/img/search.png";
import Chat from "../../assets/img/chat.png";
import Ava from "../../assets/img/ava.png";

export default function Navbar(props) {
  let navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-products">
      <div className="container">
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
          <div className="row justify-content-md-none justify-content-center pt-3">
            <div className="col-4 col-md-5">
              <input
                type="text"
                className="form-control ps-5 rounded-5 bg-light"
                id="exampleFormControlInput1"
                placeholder="search"
                onChange={(event) => {
                  event.preventDefault();
                  navigate(`/products?name=${event.target.value}`);
                }}
              />
              <img
                className="position-relative bottom-50 img-search"
                src={Search}
                alt="search"
              />
            </div>
            <div className="col-2 col-md-2 ps-4">
              <Link to="#">
                <img src={Chat} alt="search" />
              </Link>
            </div>
            <div className="col-2 col-md-2">
              <Link to="/profile.html">
                <img src={Ava} alt="avatar" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
