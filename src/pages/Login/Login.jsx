import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// assets
import "../Login/Login.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";
import Show from "../../assets/img/show.png";
import Hide from "../../assets/img/hide.png";

//Redux
import { loginAction } from "../../redux/actionCreator/auth";

//components
import ModalWarning from "../../components/ModalWarning/ModalWarning";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const { state } = location;
  //   if (state === null && !state?.isAuthenticated) {
  //     setShowModal(true);
  //   }
  // }, [location]);

  const loginHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(loginAction(form))
      .then((res) => {
        setMessage({ ...message, success: res.value.data.message });
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage({ ...message, error: err.response.data.message });
        setLoading(false);
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
                <p>DIZZY COFFEE SHOP</p>
              </Link>
              <p className="header-title-auth">Login</p>
            </header>
            <form className="main-form-auth" onSubmit={loginHandler}>
              <label className="label-auth" htmlFor="email">
                Email Address :
              </label>
              <input
                className="input-auth"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={form.email}
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
                value={form.password}
                onChange={(event) => {
                  setForm({ ...form, password: event.target.value });
                }}
              />
              <Link
                to="/auth/forgot"
                className="mt-2 forgot-password text-decoration-none"
              >
                Forgot password?
              </Link>
              <button
                className="button-auth normal"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Login
              </button>
              <Link to="/" className="button-auth google">
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
              <Link to="/auth/register" className="button-auth login">
                <p className="register-google-text">Sign up Here</p>
              </Link>
            </form>
          </main>
          <footer className="footer-content-auth">
            <div className="footer-side">
              <div className="footer-title-auth">
                <img src={Logo} alt="logo-coffeschop" />
                <p className="footer-title">DIZZY COFFE SHOP</p>
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
      <ModalWarning
        message="You have to login first!!"
        showModal={showModal}
        hideModal={() => {
          setShowModal(false);
          navigate("/auth/login", { replace: true, state: null });
        }}
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                {!isLoggedIn ? (
                  <p className="text-warning">
                    {!loading ? `${message.error}` : "Please wait ..."}
                  </p>
                ) : (
                  <p className="text-danger">
                    {!loading ? `${message.success}` : "Please wait ..."}
                  </p>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {loading ? null : (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate("/");
                      return window.scrollTo(0, 0);
                    }
                    setForm({
                      email: "",
                      password: "",
                    });
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
