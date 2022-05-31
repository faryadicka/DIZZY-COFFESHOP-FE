import { Link, Navigate } from "react-router-dom";
import { Navbar, Container, Button, Nav } from "react-bootstrap";

// assets
import "./NavbarHome.scoped.css";
import Logo from "../../assets/img/logo.png";

import React from "react";

export default function NavbarHome() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-xl-top fw-bold"
          />{" "}
          Dizzy Coffee Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 mx-auto pt-xl-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav className="mb-3">
              <Link className="text-decoration-none text-gray me-xl-4" to="/">
                Home
              </Link>
              <Link
                className="text-decoration-none text-gray me-xl-4"
                to="/products"
              >
                Product
              </Link>
              <Link
                className="text-decoration-none text-gray me-xl-4"
                to="/payment"
              >
                Your Cart
              </Link>
              <Link
                className="text-decoration-none text-gray me-xl-4"
                to="/history"
              >
                History
              </Link>
            </Nav>
            <div className="wrap-nav-right ms-md-5 d-flex justify-content-center">
              <Button
                variant=""
                href="/login"
                // onClick={() => {
                //   return <Navigate to="/login" />;
                // }}
              >
                Login
              </Button>{" "}
              <Button
                // onClick={() => {
                //   return <Navigate to="/register" />;
                // }}
                href="/register"
                variant="warning"
                className="rounded-5 button-sign-up-navbar"
              >
                Sign Up
              </Button>{" "}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
