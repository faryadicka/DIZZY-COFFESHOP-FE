import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap"

// assets
import '../../components/Navbars/Navbars.css'
import Logo from "../../assets/img/logo.png"
import Search from "../../assets/img/search.png"
import Message from "../../assets/img/chat.png"
import Profile from "../../assets/img/ava.png"

export default class Navbars extends Component {
  render() {
    return (
      <Navbar>
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Navbar.Brand href="#home">
                <img
                  alt="logo"
                  src={Logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-xl-top"
                />{' '}
                Dizzy Coffee Shop
              </Navbar.Brand>
              <Nav className="mx-xl-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Product</Nav.Link>
                <Nav.Link href="#pricing">Your Cart</Nav.Link>
                <Nav.Link href="#pricing">History</Nav.Link>
              </Nav>
            </Nav>
            <Form className="d-flex">
              <Button className='button-search-navbar'><img className='img-button-navbar' src={Search} alt="search-button" /></Button>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-xl-2 rounded-5 ps-xl-5"
                aria-label="Search"
              />
            </Form>
            <Nav.Link to="#"><img src={Message} alt="chat-logo" /></Nav.Link>
            <Nav.Link className='ms-xl-2' to="#"><img src={Profile} alt="chat-logo" /></Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
