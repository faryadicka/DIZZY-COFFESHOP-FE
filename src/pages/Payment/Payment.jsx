import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
// Assets
import "../Payment/Payment.scoped.css";
import CardCart from "../../components/CardCart/CardCart";

//services

import { getProfile } from "../../services/profile";
import withNavigate from "../../helpers/withNavigate";

export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: "",
      address: "",
      phone: "",
      errorMsg: "",
      successMsg: "",
      isError: false,
      isSuccess: false,
      token: localStorage.getItem("sign-payload"),
      cart: JSON.parse(localStorage.getItem("cart")),
    };
  }

  getInfoUser = (token) => {
    getProfile(token)
      .then((res) => {
        console.log(res);
        this.setState({
          address: res.data.total.address,
          phone: res.data.total.phone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePostTransaction = () => {
    const { deliveryMethods, size, time, qty, id, price } = this.state.cart;
    const { token, address, phone, paymentMethods } = this.state;
    const subtotal = price * qty;
    const taxAndFees = subtotal * 0.1;
    const shipping = subtotal * 0.2;
    const total = subtotal + taxAndFees + shipping;
    const body = {
      productsId: id,
      deliveryMethods,
      size,
      time,
      quantity: qty,
      total,
      subtotal,
      shipping,
      taxAndFees,
      phone,
      address,
      paymentMethods,
    };
    const URL = "http://localhost:5000/api/transactions";
    axios
      .post(URL, body, { headers: { "x-access-token": token } })
      .then((res) => {
        console.log(res);
        this.setState({
          successMsg: res.data.message,
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMsg: err.response.data.message,
          isError: true,
        });
      });
  };

  componentDidMount() {
    const { token } = this.state;
    this.getInfoUser(token);
  }

  render() {
    const { size, qty, image, name, price } = this.state.cart;
    const subTotal = price * qty;
    const taxAndFees = subTotal * 0.1;
    const shipping = subTotal * 0.2;
    const total = subTotal + taxAndFees + shipping;
    const { navigate } = this.props;
    console.log(this.state);
    return (
      <>
        <Navbar />
        <main className="main-payment mt-5">
          <div className="container">
            <div className="row justify-content-center justify-content-lg-between">
              <div className="col-auto col-md-4">
                <p className="text-white header-payment">
                  Checkout your item now!
                </p>
              </div>
            </div>
            <div className="row justify-content-around mt-md-5 gap-5">
              <div className="col-8 col-md-6">
                <div className="card rounded-4 px-3 h-100">
                  <div className="card-body">
                    <h4 className="header-payment-card card-title text-center">
                      Old Summary
                    </h4>
                    <CardCart
                      image={`http://localhost:5000${image}`}
                      name={name}
                      qty={qty}
                      size={size}
                      price={`IDR ${subTotal}`}
                    />
                    <div className="d-flex justify-content-between border-top border-dark pt-4">
                      <p className="subtotal">SUBTOTAL</p>
                      <p className="price">{`IDR ${subTotal}`}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="tax-fees">TAX & FEES</p>
                      <p className="price">{`IDR ${taxAndFees}`}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="shipping">SHIPPING</p>
                      <p className="price">{`IDR ${shipping}`}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                      <h5 className="total fw-bold">TOTAL</h5>
                      <h5 className="price fw-bold">{`IDR ${total}`}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <p className="adress-payment text-white">Adress details</p>
                    <p className="edit-adress text-white fw-bold pt-3">edit</p>
                  </div>
                  <div className="card p-4 rounded-4">
                    <input
                      type="text"
                      className="address-payment p-2 "
                      placeholder="Input your Street"
                      value={`Delivery to ${this.state.address}`}
                    />
                    <input
                      type="text"
                      className="address-payment p-2"
                      placeholder="Input your detail street"
                      value={this.state.address}
                      onChange={(event) => {
                        this.setState({
                          address: event.target.value,
                        });
                      }}
                    />
                    <input
                      type="number"
                      className="phone-payment p-2"
                      placeholder="Input your phone number"
                      value={this.state.phone}
                      onChange={(event) => {
                        this.setState({
                          phone: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="adress-payment text-white">Payment Methods</p>
                  </div>
                  <div className="card p-4 rounded-5">
                    <div className="form-check p-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment-methods"
                        id="card"
                        value="Card"
                        onChange={(event) => {
                          this.setState({
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <label className="form-check-label" htmlFor="card">
                        Card
                      </label>
                    </div>
                    <div className="form-check form-check-mid p-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment-methods"
                        id="bank"
                        value="Bank"
                        onChange={(event) => {
                          this.setState({
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <label className="form-check-label" htmlFor="bank">
                        Bank Account
                      </label>
                    </div>
                    <div className="form-check p-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment-methods"
                        id="cod"
                        value="COD"
                        onChange={(event) => {
                          this.setState({
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <label className="form-check-label" htmlFor="cod">
                        Cash on delivery
                      </label>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-5 col-md-12">
                      <button
                        onClick={this.handlePostTransaction}
                        className="w-100 btn btn-choco mt-4 py-4 rounded-4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        type="submit"
                      >
                        Confirm and Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">
                  {this.state.isError ? (
                    <p className="text-warning">
                      {this.state.errorMsg}
                      {"!"}
                    </p>
                  ) : (
                    <p className="text-danger">{this.state.successMsg}</p>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigate(Payment);
