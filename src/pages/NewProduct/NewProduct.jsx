import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./NewProduct.scoped.css";

export class NewProduct extends Component {
  render() {
    return (
      <>
        <Navbar />
        <form className="container form-container-create">
          <div className="row">
            <div className="col-auto">
              <Link to="/products">Products</Link>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-md-3 mt-4">
              <input type="file" name="profile" id="profile" />
              <div className="row mt-4">
                <button className="btn btn-choco py-3 rounded-4">
                  Take a picture
                </button>
              </div>
              <div className="row mt-2">
                <button className="btn btn-warning py-3 rounded-4">
                  Choose from gallery
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-4">
                <label className="mb-3" htmlFor="name">
                  Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Type product name min. 50 characters"
                />
              </div>
              <div className="form-group mt-4">
                <label className="mb-3" htmlFor="name">
                  Price :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Type the price"
                />
              </div>
              <div className="form-group mt-4">
                <label className="mb-3" htmlFor="name">
                  Description :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Type product name min. 150 characters"
                />
              </div>
              <div className="form-group mt-4">
                <div className="row">
                  <label htmlFor="size">Input product size :</label> <br />
                  <small id="size-help" className="form-text text-muted">
                    Click size you want to use for this product
                  </small>
                </div>
                <div className="d-flex mt-3 gap-3">
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="reguler"
                    value="Reguler"
                  />
                  <label
                    htmlFor="reguler"
                    className="btn btn-outlined-order btn-warning rounded-circle"
                  >
                    R
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="large"
                    value="large"
                  />
                  <label
                    htmlFor="large"
                    className="btn btn-outlined-order  btn-warning rounded-circle"
                  >
                    L
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="extra-large"
                    value="extra-large"
                  />
                  <label
                    htmlFor="extra-large"
                    className="btn btn-outlined-order btn-warning rounded-circle"
                  >
                    XL
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="250-gr"
                    value="250-gr"
                  />
                  <label
                    htmlFor="250-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    250 gr
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="300-gr"
                    value="300-gr"
                  />
                  <label
                    htmlFor="300-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    300 gr
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="500-gr"
                    value="500-gr"
                  />
                  <label
                    htmlFor="500-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    500 gr
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row delivery justify-content-around mt-4">
            <div className="col-md-4">
              <div className="row">
                <label className="fw-bold">Delivery Hour :</label>
              </div>
              <div className="row mt-4">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="hour"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select start hour :
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/" />
                      Action
                    </li>
                  </ul>
                </div>
                <div className="dropdown mt-2">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select end hour
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Action
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="form-group">
                <div className="row">
                  <label htmlFor="size">Input delivery methods :</label> <br />
                  <small id="size-help" className="form-text text-muted">
                    Click methods you want to use for this product
                  </small>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="reguler"
                    value="Reguler"
                  />
                  <label
                    htmlFor="reguler"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Home Delivery
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="large"
                    value="large"
                  />
                  <label
                    htmlFor="large"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Dine In
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="extra-large"
                    value="extra-large"
                  />
                  <label
                    htmlFor="extra-large"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Take Away
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-around mt-4">
            <div className="col-md-4">
              <div className="row">
                <label className="fw-bold">Input Stock :</label>
              </div>
              <div className="row input-stock">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Input Stock
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Action
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row">
                <button className="btn btn-choco rounded-4 py-3">
                  Save Product
                </button>
              </div>
              <div className="row mt-3">
                <button className="btn btn-light rounded-4 py-3">Cancel</button>
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </>
    );
  }
}

export default NewProduct;
