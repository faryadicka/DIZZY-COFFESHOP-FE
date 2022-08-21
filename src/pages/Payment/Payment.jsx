import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCreditCard, FaPiggyBank, FaTruckMonster } from "react-icons/fa";

import "../Payment/Payment.scoped.css";

//helper
import currentPeriod from "../../helpers/formatCurrency";

//component
import CardCart from "../../components/CardCart/CardCart";
import CardUnOrdered from "../../components/CardUnOrdered/CardUnOrdered";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

//axios
import { postPaymentAxios } from "../../services/payment";

//reduxaction
import { clearCartAction } from "../../redux/actionCreator/cart";

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.users.userData);
  const token = useSelector((state) => state.auth.authData?.token);
  const subTotal = cart?.price * cart?.qty;
  const taxAndFees = subTotal * 0.1;
  const shipping = subTotal * 0.2;
  const total = subTotal + taxAndFees + shipping;
  const [user, setUser] = useState({
    address: userData?.address,
    phone: userData?.phone,
    paymentMethods: "",
  });
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const paymentHandler = () => {
    const body = {
      productsId: cart.id,
      deliveryMethods: cart.delivery,
      size: cart.size,
      time: cart.time,
      quantity: cart.qty,
      total,
      subtotal: subTotal,
      shipping,
      taxAndFees,
      phone: user.phone,
      address: user.address,
      paymentMethods: user.paymentMethods,
    };
    postPaymentAxios(body, token)
      .then((res) => {
        console.log(res);
        setMessage({ ...message, success: res.data?.message });
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage({ ...message, error: err.response?.data.message });
        setIsSuccess(false);
      });
  };

  return (
    <>
      <Navbar />
      <main className="main-payment mt-5">
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between">
            <div className="col-auto col-md-5">
              <p className="text-white header-payment">
                Checkout your item now!
              </p>
            </div>
          </div>
          {!cart?.checkOut ? (
            <div className="row justify-content-around mt-md-5 gap-5">
              <CardUnOrdered />
            </div>
          ) : (
            <div className="row justify-content-around mt-md-5 gap-5">
              <div className="col-8 col-md-6">
                <div className="card rounded-4 px-3 h-100">
                  <div className="card-body pt-5 mt-5">
                    <h4 className="header-payment-card card-title text-center">
                      Old Summary
                    </h4>
                    <CardCart
                      image={`${cart?.image}`}
                      name={cart?.name}
                      qty={cart?.qty}
                      size={cart?.size}
                      price={`IDR ${subTotal}`}
                    />
                    <div className="d-flex justify-content-between border-top border-dark pt-4">
                      <p className="subtotal">SUBTOTAL</p>
                      <p className="price">{`IDR ${currentPeriod(
                        subTotal
                      )}`}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="tax-fees">TAX & FEES</p>
                      <p className="price">{`IDR ${currentPeriod(
                        taxAndFees
                      )}`}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="shipping">SHIPPING</p>
                      <p className="price">{`IDR ${currentPeriod(
                        shipping
                      )}`}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                      <h5 className="total fw-bold">TOTAL</h5>
                      <h5 className="price fw-bold">{`IDR ${currentPeriod(
                        total
                      )}`}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <p className="adress-payment text-white">Adress details</p>
                    <p
                      role="button"
                      onClick={() => {
                        setDisabled(!disabled);
                      }}
                      className="edit-address text-white fw-bold pt-3"
                    >
                      EDIT
                    </p>
                  </div>
                  <div className="card p-4 rounded-4">
                    <input
                      type="text"
                      className="address-payment p-2 "
                      placeholder="Input your Street"
                      value={`Delivery to ${user.address}`}
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      className="address-payment p-2"
                      placeholder="Input your detail street"
                      value={user.address}
                      disabled={disabled}
                      onChange={(event) => {
                        setUser(event.target.value);
                      }}
                    />
                    <input
                      type="number"
                      className="phone-payment p-2"
                      placeholder="Input your phone number"
                      value={user.phone}
                      disabled={disabled}
                      onChange={(event) => {
                        setUser({ ...user, phone: event.target.value });
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
                          setUser({
                            ...user,
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <div className="d-flex gap-1 align-items-center">
                        <div className="box-img color-box-orange text-center">
                          <FaCreditCard size={25} color="#fff" />
                        </div>
                        <label className="form-check-label" htmlFor="card">
                          Card
                        </label>
                      </div>
                    </div>
                    <div className="form-check form-check-mid p-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment-methods"
                        id="bank"
                        value="Bank"
                        onChange={(event) => {
                          setUser({
                            ...user,
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <div className="d-flex gap-1 align-items-center">
                        <div className="box-img color-box-choco text-center">
                          <FaPiggyBank size={25} color="#fff" />
                        </div>
                        <label className="form-check-label" htmlFor="bank">
                          Bank Account
                        </label>
                      </div>
                    </div>
                    <div className="form-check p-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment-methods"
                        id="cod"
                        value="COD"
                        onChange={(event) => {
                          setUser({
                            ...user,
                            paymentMethods: event.target.value,
                          });
                        }}
                      />
                      <div className="d-flex gap-1 align-items-center">
                        <div className="box-img color-box-yellow text-center">
                          <FaTruckMonster size={25} color="#fff" />
                        </div>
                        <label className="form-check-label" htmlFor="cod">
                          Cash on delivery
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-5 col-md-12">
                      <button
                        onClick={paymentHandler}
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
          )}
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
                {isSuccess === false ? (
                  <p className="text-warning">
                    {message.error}
                    {"!"}
                  </p>
                ) : (
                  <p className="text-danger">{message.success}</p>
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
                  dispatch(clearCartAction());
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

export default Payment;
