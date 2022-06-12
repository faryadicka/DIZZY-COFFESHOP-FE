import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
// component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
// assets
import "../ProductDetail/ProductDetail.scoped.css";
import DefaultProducts from "../../assets/img/default.png";
// import ImageProduct from "../../assets/img/cold-brew.png";

// Helpers
import withParams from "../../helpers/withParams";

//Redux
import {
  increment,
  decrement,
  setDelivery,
  setIdProduct,
  setImage,
  setName,
  setSize,
  setTime,
  setPrice,
} from "../../redux/actionCreator/cart";

// Services
import { getProductDetail } from "../../services/product";
import ModalWarning from "../../components/ModalWarning/ModalWarning";
import withNavigate from "../../helpers/withNavigate";
import withLocation from "../../helpers/withLocation";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isCheckOut: false,
      successMsg: "",
      errorMsg: "",
      token: localStorage.getItem("token"),
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

  cartHandle = (event) => {
    event.preventDefault();
    const { detailProduct } = this.state.products;
    console.log(detailProduct.name);
    console.log(detailProduct.price);
    const {
      params: { id },
      dispatch,
    } = this.props;
    dispatch(setIdProduct(id));
    dispatch(setImage(detailProduct.image));
    dispatch(setName(detailProduct.name));
    dispatch(setPrice(detailProduct.price));
  };

  checkOutHandle = () => {
    const { token } = this.state;
    if (token) {
      this.setState({
        isCheckOut: true,
      });
    }
    this.setState({
      showModal: true,
    });
  };

  componentDidMount() {
    const {
      params: { id },
      location: { state },
    } = this.props;
    if (state !== null && !state.isAuthenticated) {
      this.setState({
        showModal: true,
      });
    }
    this.getProductDetailPage(id);
  }

  render() {
    const { detailProduct } = this.state.products;
    const { params, navigate, dispatch, qty, size, delivery } = this.props;
    console.log(qty);
    if (this.state.isCheckOut) return <Navigate to="/payment" />;
    return (
      <div>
        <Navbar />
        <main className="main-product-detail mt-5">
          {params.id ? (
            <div className="container mt-0 mt-md-5">
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
              <form
                onSubmit={this.cartHandle}
                className="pt-5 ps-md-5 row justify-content-center justify-content-md-center gap-2"
              >
                <div className="card-info-detail col-3 col-md-4 text-center">
                  <img
                    className="rounded-circle image-product-detail"
                    src={`http://localhost:5000${detailProduct.image}`}
                    alt=""
                  />
                  <p className="title-product-detail">{detailProduct.name}</p>
                  <p className="price-product-detail">{`IDR ${
                    detailProduct.price || ""
                  }`}</p>
                  <div className="row justify-content-center mt-5">
                    <button
                      type="submit"
                      className="btn btn-choco w-75 py-3 rounded-4"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="row justify-content-center mt-3">
                    <button className="btn btn-warning w-75 py-3 rounded-4">
                      Ask a Staff
                    </button>
                  </div>
                </div>
                <div className="col-7 col-md-7">
                  <div className="row justify-content-between justify-content-md-center">
                    <div className="col-8 col-md-8 pt-5 pt-md-0">
                      <div className="card p-md-5 rounded-4 h-100">
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
                          <div className="d-flex justify-content-around mt-5 mt-md-0 ">
                            <button
                              onClick={() => {
                                dispatch(setSize("Regular"));
                              }}
                              className="btn btn-warning rounded-circle"
                            >
                              R
                            </button>
                            <button
                              onClick={() => {
                                dispatch(setSize("Large"));
                              }}
                              className="btn btn-warning rounded-circle"
                            >
                              L
                            </button>
                            <button
                              onClick={() => {
                                dispatch(setSize("Extra Large"));
                              }}
                              className="btn btn-warning rounded-circle"
                            >
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
                      <div className="d-flex flex-column flex-md-row justify-content-around mt-5 checked-delivery-methods">
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="dinein"
                          value="Dine in"
                          checked={delivery === "Dine in"}
                          onChange={(event) => {
                            dispatch(setDelivery(event.target.value));
                          }}
                        />
                        <label
                          className="btn btn-outline-order"
                          htmlFor="dinein"
                        >
                          Dine In
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="door"
                          value="Door Delivery"
                          checked={delivery === "Door Delivery"}
                          onChange={(event) => {
                            dispatch(setDelivery(event.target.value));
                          }}
                        />
                        <label
                          className="btn btn-outline-order mt-2 mt-md-0"
                          htmlFor="door"
                        >
                          Door Delivery
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-outlined"
                          id="pick"
                          value="Pick up"
                          checked={delivery === "Pick up"}
                          onChange={(event) => {
                            dispatch(setDelivery(event.target.value));
                          }}
                        />
                        <label
                          className="btn btn-outline-order mt-2 mt-md-0"
                          htmlFor="pick"
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
                            value={this.state.time}
                            onChange={(event) => {
                              dispatch(setTime(event.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row justify-content-center card-payment">
                <div className="col-6 col-md-6">
                  <div className="card p-3 card-payment-cart rounded-4">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-2 card-col-cart ps-md-0">
                        <img
                          className="rounded-circle w-100 image-cart"
                          src={
                            `http://localhost:5000${detailProduct.image}` ||
                            DefaultProducts
                          }
                          alt="imageDetail"
                        />
                      </div>
                      <div className="ms-2 col-md-5 text-md-left">
                        <p className="title fw-bold">{detailProduct.name}</p>
                        <div className="d-flex">
                          {qty !== 0 ? (
                            <p className="qty">{`${qty}x `}</p>
                          ) : null}
                          <p className="size ms-md-2 ms-0">{size}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => {
                              if (qty > 0) {
                                dispatch(decrement());
                              }
                            }}
                            className="btn btn-choco rounded-circle"
                          >
                            -
                          </button>
                          <div className="col-md-4 mx-3 mx-md-0 text-center mt-1 fw-bold">
                            {qty}
                          </div>
                          <button
                            onClick={() => {
                              dispatch(increment());
                            }}
                            className="btn btn-choco rounded-circle"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-md-3">
                  <button
                    onClick={this.checkOutHandle}
                    className="btn btn-warning w-100 h-100 rounded-4"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </main>
        <Footer />
        <ModalWarning
          message="You have to login first!!"
          showModal={this.state.showModal}
          hideModal={() => {
            this.setState({ modalShow: false }, () =>
              navigate("/login", { replace: true, state: null })
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    cart: { qty, size, delivery },
  } = state;
  return { qty, size, delivery };
};

export default connect(mapStateToProps)(
  withLocation(withNavigate(withParams(ProductDetail)))
);
