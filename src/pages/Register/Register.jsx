import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// assets
import "../Register/Register.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";
import Show from "../../assets/img/show.png";
import Hide from "../../assets/img/hide.png";
//axios
import { registerAxios } from "../../services/auth";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });
  const [isError, setIsError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const registerhandler = (event) => {
    event.preventDefault();
    registerAxios(form)
      .then(() => {
        setMessage({ ...message, success: "Register successfully" });
        setIsError(false);
      })
      .catch((err) => {
        setMessage({ ...message, error: err.response?.data.message });
        setIsError(true);
      });
  };

  return (
    <>
      <div className="container-auth">
        <aside className="picture">
          <img className="image-aside-auth" src={Banner} alt="auth-aside" />
        </aside>
        <div className="containter-main-footer-auth">
          <main className="main-auth">
            <header className="main-header-auth">
              <Link to="/">
                <img src={Logo} alt="logo-coffeeshop" />
              </Link>
              <Link to="/" className="header-brand-auth">
                <p>Dizzy Coffee Shop</p>
              </Link>
              <p className="header-title-auth">Sign Up</p>
            </header>
            <form className="main-form-auth" onSubmit={registerhandler}>
              <label className="label-auth" htmlFor="email">
                Email Address :
              </label>
              <input
                className="input-auth"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value });
                }}
              />
              <label className="label-auth" htmlFor="password">
                Password :
                <button
                  className="eye-button"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <img
                    src={showPass ? Show : Hide}
                    alt="eye"
                    className="eye-pass"
                  />
                </button>
              </label>
              <input
                className="input-auth"
                type={`${showPass ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(event) => {
                  setForm({ ...form, password: event.target.value });
                }}
              />
              <label className="label-auth" htmlFor="phone">
                Phone Number :
              </label>
              <input
                className="input-auth"
                type="phone"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                onChange={(event) => {
                  setForm({ ...form, phone: event.target.value });
                }}
              />
              <button
                className="button-auth normal"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Sign Up
              </button>
              <Link to="/" className="button-auth google" type="submit">
                <img
                  className="google-button-login"
                  src={Google}
                  alt="google-logo"
                />{" "}
                <p className="login-google-text">Login with Google</p>
              </Link>
              <section className="has-account">
                <div className="underline"></div>
                <p className="already-account">Already have an account?</p>
                <div className="underline"></div>
              </section>
              <Link to="/login" className="button-auth login">
                <p className="signup-google-text">Login</p>
              </Link>
            </form>
          </main>
          <footer className="footer-content-signup">
            <div className="footer-side">
              <div className="footer-title-auth">
                <img src={Logo} alt="logo-coffeschop" />
                <p className="footer-title">Dizzy Coffee Shop</p>
              </div>
              <p className="footer-desc">
                Coffee Shop is a store that sells some good meals, and
                especially coffee. We provide high quality beans
              </p>
              <div className="footer-logo">
                <img src={Facebook} alt="facebook-logo" />
                <img src={Twitter} alt="twitter-logo" />
                <img src={Instagram} alt="instagram-logo" />
              </div>
              <p className="copy-right">©DIZZY COFFEE SHOP</p>
            </div>
            <div className="footer-info">
              <p className="title-info-footer">Product</p>
              <ul className="product-info-auth">
                <li className="info-detail">Download</li>
                <li className="info-detail">Pricing</li>
                <li className="info-detail">Location</li>
                <li className="info-detail">Countries</li>
                <li className="info-detail">Blog</li>
              </ul>
              <p className="title-info-footer">Engange</p>
              <ul className="product-info-auth">
                <li className="info-detail">Coffee Shop?</li>
                <li className="info-detail">About Us</li>
                <li className="info-detail">FAQ</li>
                <li className="info-detail">Privacy Policy</li>
                <li className="info-detail">Term of Services</li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
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
                {isError ? (
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
                  if (isError === true) {
                    navigate("/register");
                    return window.scrollTo(0, 0);
                  }
                  navigate("/login");
                  return window.scrollTo(0, 0);
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

export default SignUp;
