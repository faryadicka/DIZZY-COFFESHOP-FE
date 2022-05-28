import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
// component
import Navbar from "../../components/Navbars/Navbars";
import Footer from "../../components/Footer/Footer";
// assets
import "../ProductDetail/ProductDetail.scoped.css";
import ImageProduct from "../../assets/img/cold-brew.png";

export class ProductDetail extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <main className="main-product-detail">
            <div className="container mt-5">
              <div className="row link-product-detail">
                <div className="m-0 col-auto col-md-4">
                  <Link
                    className="text-decoration-none text-dark"
                    to="/products"
                  >
                    <span className="link-product-detail">
                      Favorite & Promo {">"}
                    </span>
                  </Link>
                  <span className="fw-bold"> Cold Brew</span>
                </div>
              </div>
              <div className="row justify-content-center justify-content-md-center gap-2">
                <div className="col-md-4 text-center">
                  <img
                    className="rounded-circle image-product-detail"
                    src={ImageProduct}
                    alt=""
                  />
                  <h1 className="title-product-detail">COLD BREW</h1>
                  <p className="price-product-detail">IDR 30.000</p>
                  <div className="row justify-content-center mt-5">
                    <button className="btn btn-choco w-75 py-3 rounded-4">
                      Add to Cart
                    </button>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <button className="btn btn-warning w-75 py-3 rounded-4">
                      Ask a Staff
                    </button>
                  </div>
                </div>
                <div className="col-9 col-md-7">
                  <div className="row justify-content-between justify-content-md-center">
                    <div className="col-8 col-md-8">
                      <div className="card p-md-5 rounded-4">
                        <div className="card-body">
                          <p className="card-title">
                            Delivery only on{" "}
                            <span className="fw-bold">
                              Monday to friday at 1 - 7 pm
                            </span>
                          </p>
                          <p className="card-text mt-5">
                            Cold brewing is a method of brewing that combines
                            ground coffee and cool water and uses time instead
                            of heat to extract the flavor. It is brewed in small
                            batches and steeped for as long as 48 hours.
                          </p>
                          <p className="card-text mt-5 text-center fw-bold">
                            Choose a size
                          </p>
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-warning rounded-circle">
                              R
                            </button>
                            <button className="btn btn-warning rounded-circle">
                              L
                            </button>
                            <button className="btn btn-warning rounded-circle">
                              XL
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-8">
                      <h5 className="delivery-methods-products text-center mt-5 fw-bold">
                        Choose Delivery Methods
                      </h5>
                      <div className="d-flex flex-column flex-md-row justify-content-around mt-5">
                        <input
                          type="radio"
                          class="btn-check"
                          name="options-outlined"
                          id="dinein-outlined"
                          autocomplete="off"
                        />
                        <label
                          class="btn btn-outline-warning"
                          for="dinein-outlined"
                        >
                          Dine In
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="options-outlined"
                          id="door-outlined"
                          autocomplete="off"
                        />
                        <label
                          class="btn btn-outline-warning mt-2 mt-md-0"
                          for="door-outlined"
                        >
                          Door Dlivery
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="options-outlined"
                          id="pick-outlined"
                          autocomplete="off"
                        />
                        <label
                          class="btn btn-outline-warning mt-2 mt-md-0"
                          for="pick-outlined"
                        >
                          Pick up
                        </label>
                      </div>
                      <div class="row g-3 align-items-center mt-3 mt-md-5">
                        <div class="col-auto">
                          <label for="inputPassword6" class="col-form-label">
                            Set time :
                          </label>
                        </div>
                        <div class="col-md-8">
                          <input
                            type="text"
                            id="inputPassword6"
                            class="form-control border-top-0 w-100"
                            placeholder="Enter the time you’ll arrived"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default ProductDetail;
