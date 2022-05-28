import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// assets
import "../Navbar/Navbar.scoped.css";
import Logo from "../../assets/img/logo.png";
import Search from "../../assets/img/search.png";
import Chat from "../../assets/img/chat.png";
import Ava from "../../assets/img/ava.png";

export default function Navbar() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light navbar-products">
        <div class="container">
          <Link class="navbar-brand brand" to="#">
            <img src={Logo} alt="logo-brand" /> Dizzy Coffee Shop
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse mr-auto" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <Link class="nav-link" to="#home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Your Cart
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  History
                </Link>
              </li>
            </ul>
            <div class="row justify-content-md-none justify-content-center pt-3">
              <div class="col-4 col-md-5">
                <input
                  type="text"
                  class="form-control ps-5 rounded-5 bg-light"
                  id="exampleFormControlInput1"
                  placeholder="search"
                />
                <img
                  className="position-relative bottom-50 img-search"
                  src={Search}
                  alt="search"
                />
              </div>
              <div class="col-2 col-md-2 ps-4">
                <Link to="#">
                  <img src={Chat} alt="search" />
                </Link>
              </div>
              <div class="col-2 col-md-2">
                <Link to="/profile.html">
                  <img src={Ava} alt="avatar" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Router>
  );
}
