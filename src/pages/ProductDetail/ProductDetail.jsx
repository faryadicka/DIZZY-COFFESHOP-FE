import React, { Component } from "react";
import { Link } from "react-router-dom";
// component
import Navbar from "../../components/Navbars/Navbars";
import Footer from "../../components/Footer/Footer";
// assets
import "../ProductDetail/ProductDetail.scoped.css";
// import ImageProduct from "../../assets/img/cold-brew.png";

// Helpers
import withParams from "../../helpers/withParams";

// Services
import { getProductDetail } from "../../services/product";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      products: {
        detailProduct: [],
      },
    };
  }

  getProductDetailPage = (id) => {
    getProductDetail(id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: { ...this.state.products, detailProduct: res.data.data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const {
      params: { id },
    } = this.props;
    this.getProductDetailPage(id);
  }

  render() {
    const { detailProduct } = this.state.products;
    const { params } = this.props;
    return (
      <div>
        <Navbar />
        <main className="main-product-detail">
          {params.id ? (
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
                  <span className="fw-bold">{detailProduct.name}</span>
                </div>
              </div>
              <div className="row justify-content-center justify-content-md-center gap-2">
                <div className="col-md-4 text-center">
                  <img
                    className="rounded-circle image-product-detail"
                    src={`http://localhost:5000${detailProduct.image}`}
                    alt=""
                  />
                  <h1 className="title-product-detail">{detailProduct.name}</h1>
                  <p className="price-product-detail">{`IDR ${detailProduct.price}`}</p>
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
                              {detailProduct.delivery_info}
                            </span>
                          </p>
                          <p className="card-text mt-5">
                            {detailProduct.description}
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
                          className="btn-check"
                          name="options-outlined"
                          id="dinein-outlined"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-order"
                          htmlFor="dinein-outlined"
                        >
                          Dine In
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="door-outlined"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-order mt-2 mt-md-0"
                          htmlFor="door-outlined"
                        >
                          Door Dlivery
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="pick-outlined"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-order mt-2 mt-md-0"
                          htmlFor="pick-outlined"
                        >
                          Pick up
                        </label>
                      </div>
                      <div className="row g-3 align-items-center mt-3 mt-md-5">
                        <div className="col-auto">
                          <label
                            htmlFor="inputPassword6"
                            className="col-form-label"
                          >
                            Set time :
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            id="inputPassword6"
                            className="form-control border-top-0 w-100"
                            placeholder="Enter the time you’ll arrived"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withParams(ProductDetail);
