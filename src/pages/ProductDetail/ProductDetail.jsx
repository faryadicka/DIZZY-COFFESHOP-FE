import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import currencyPeriod from "../../helpers/formatCurrency";

// component
import Navbar from "../../components/Navbar/Navbar";
import NavbarDefault from "../../components/NavbarHome/Navbar";
import Footer from "../../components/Footer/Footer";
import ModalWarning from "../../components/ModalWarning/ModalWarning";

// assets
import "../ProductDetail/ProductDetail.scoped.css";
import DefaultProducts from "../../assets/img/default.png";

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
  setCheckOut,
} from "../../redux/actionCreator/cart";

// Services
import { getProductDetail } from "../../services/product";

function ProductDetail() {
  const token = useSelector((state) => state.auth.authData?.token);
  const role = useSelector((state) => state.auth.autData?.role);
  const cart = useSelector((state) => state.cart);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    time: "",
  });

  const getProductDetailPage = (id) => {
    getProductDetail(id)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetailPage(params.id);
  }, []);

  const cartHandle = (event) => {
    event.preventDefault();
    dispatch(setIdProduct(params.id));
    dispatch(setImage(product.image));
    dispatch(setName(product.name));
    dispatch(setPrice(product.price));
  };

  const checkOutHandle = () => {
    if (token) {
      setCheckOut(true);
      dispatch(setCheckOut(true));
      return navigate("/payment");
    }
    setShowModal(true);
  };
  return (
    <div>
      {token ? <Navbar /> : <NavbarDefault />}
      <main className="main-product-detail mt-5">
        {params.id ? (
          <div className="container mt-0 mt-md-5">
            <div className="row link-product-detail">
              <div className="m-0 col-auto col-md-4">
                <Link className="text-decoration-none text-dark" to="/products">
                  <span className="link-product-detail">
                    Favorite & Promo {">"}
                  </span>
                </Link>
                <span className="fw-bold">{" "}{product?.name}</span>
              </div>
            </div>
            <form
              onSubmit={cartHandle}
              className="pt-5 ps-md-5 row justify-content-center justify-content-md-center gap-2"
            >
              <div className="card-info-detail col-3 col-md-4 text-center">
                <img
                  className="rounded-circle image-product-detail"
                  src={`${product?.image}`}
                  alt=""
                />
                <p className="title-product-detail">{product?.name}</p>
                <p className="price-product-detail">{`IDR ${
                  currencyPeriod(Number(product?.price)) || 0
                }`}</p>
                <div className="row justify-content-center mt-5">
                  {role !== "1" ? (
                    <button
                      type="submit"
                      className="btn btn-choco w-75 py-3 rounded-4"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="row justify-content-center mt-3">
                  {role !== "1" ? (
                    <button className="btn btn-warning w-75 py-3 rounded-4">
                      Ask a Staff
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate(`/products/edit/${params.id}`);
                      }}
                      className="btn btn-warning w-75 py-3 rounded-4"
                    >
                      Edit Product
                    </button>
                  )}
                </div>
              </div>
              <div className="col-7 col-md-7">
                <div className="row justify-content-between justify-content-md-center">
                  <div className="col-8 col-md-8 pt-5 pt-md-0">
                    <div className="card p-md-5 rounded-4 h-100">
                      <div className="card-body">
                        <p className="card-title">
                          Delivery only on{" "}
                          {`${product?.start_hour?.slice(0, 2)} AM`} -{" "}
                          {`${product?.end_hour?.slice(0, 2)} AM`} <br />
                          <span className="fw-bold">
                            Available delivery at Friday
                          </span>
                        </p>
                        <p className="card-text mt-5">{product?.description}</p>
                        <p className="card-text mt-5 text-center fw-bold">
                          Choose a size
                        </p>
                        <div className="d-flex justify-content-around mt-5 mt-md-0 ">
                          <button
                            onClick={() => {
                              dispatch(setSize("Regular"));
                            }}
                            className="btn btn-warning-pd rounded-circle"
                          >
                            R
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setSize("Large"));
                            }}
                            className="btn btn-warning-pd rounded-circle"
                          >
                            L
                          </button>
                          <button
                            onClick={() => {
                              dispatch(setSize("Extra Large"));
                            }}
                            className="btn btn-warning-pd rounded-circle"
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
                        checked={cart?.delivery === "Dine in"}
                        onChange={(event) => {
                          dispatch(setDelivery(event.target.value));
                        }}
                      />
                      <label className="btn btn-outline-order" htmlFor="dinein">
                        Dine In
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options-outlined"
                        id="door"
                        value="Door Delivery"
                        checked={cart?.delivery === "Door Delivery"}
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
                        checked={cart?.delivery === "Pick up"}
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
                          type="time"
                          id="inputPassword6"
                          className="form-control border-0 w-100 bg-light"
                          value={cart.time}
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
            {role !== "1" ? (
              <div className="row justify-content-center card-payment">
                <div className="col-6 col-md-6">
                  <div className="card p-3 card-payment-cart rounded-4">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-2 card-col-cart ps-md-0">
                        <img
                          className="rounded-circle image-cart"
                          src={`${product?.image}` || DefaultProducts}
                          alt="imageDetail"
                        />
                      </div>
                      <div className="ms-2 col-md-5 text-md-left">
                        <p className="title fw-bold">{product?.name}</p>
                        <div className="d-flex">
                          {cart?.qty !== 0 ? (
                            <p className="qty">{`${cart?.qty}x `}</p>
                          ) : null}
                          <p className="size ms-md-2 ms-0">{cart?.size}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => {
                              if (cart?.qty > 0) {
                                dispatch(decrement());
                              }
                            }}
                            className="btn btn-choco rounded-circle"
                          >
                            -
                          </button>
                          <div className="col-md-4 mx-3 mx-md-0 text-center mt-1 fw-bold">
                            {cart?.qty}
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
                    onClick={checkOutHandle}
                    className="btn btn-warning w-100 h-100 rounded-4"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : null}
      </main>
      <Footer />
      <ModalWarning
        message="You have to login first!!"
        showModal={showModal}
        hideModal={() => {
          setShowModal(false);
          navigate("/login", { replace: true, state: null });
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default ProductDetail;
