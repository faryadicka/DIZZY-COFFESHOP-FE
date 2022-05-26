import React, { Component } from 'react'
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Container, Button, Nav } from "react-bootstrap"

// assets
import '../../components/Navbars/NavbarHome.scoped.css'
import Logo from "../../assets/img/logo.png"

export default class NavbarHome extends Component {
  render() {
    return (
      <Router>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="logo"
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-xl-top fw-bold"
              />{' '}
              Dizzy Coffee Shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0 mx-auto pt-xl-3"
                style={{ maxHeight: '100px' }}
                navbarScroll>
                <Nav className="mb-3">
                  <Link className='text-decoration-none text-gray me-xl-4' to="#home">Home</Link>
                  <Link className='text-decoration-none text-gray me-xl-4' to="#features">Product</Link>
                  <Link className='text-decoration-none text-gray me-xl-4' to="#pricing">Your Cart</Link>
                  <Link className='text-decoration-none text-gray me-xl-4' to="#pricing">History</Link>
                </Nav>
                <div className="wrap-nav-right ms-md-5 d-flex justify-content-center">
                  <Button variant="">Login</Button>{' '}
                  <Button variant="warning" className='rounded-5 button-sign-up-navbar'>Sign Up</Button>{' '}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Router>
    )
  }
}
