import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

// assets
import "../Register/Register.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";
import Eye from "../../assets/img/eye.png";

//Helper
import withNavigate from "../../helpers/withNavigate";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phone: "",
      showPass: false,
      isError: false,
      isSuccess: false,
      errMsg: "",
      succsessMsg: "",
      isRegister: false,
    };
  }

  registerAuth = async (event) => {
    event.preventDefault();
    const URL = "http://localhost:5000/api/auth/register";
    await axios
      .post(URL, this.state)
      .then((res) => {
        console.log(res.data);
        this.setState({
          succsessMsg: "success",
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isError: true,
          errMsg: err.response.data.message,
        });
      });
  };

  render() {
    // if (this.state.isSuccess) return <Navigate to="/login" />;
    const { navigate } = this.props;
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
              <form className="main-form-auth">
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
                    this.setState({
                      email: event.target.value,
                    });
                  }}
                />
                <label className="label-auth" htmlFor="password">
                  Password :
                  <button
                    className="eye-button"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({
                        showPass: !this.state.showPass,
                      });
                    }}
                  >
                    <img src={Eye} alt="eye" className="eye-pass" />
                  </button>
                </label>
                <input
                  className="input-auth"
                  type={`${this.state.showPass ? "text" : "password"}`}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
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
                    this.setState({
                      phone: event.target.value,
                    });
                  }}
                />
                <button
                  className="button-auth normal"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={this.registerAuth}
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
                  {this.state.isError ? (
                    <p className="text-warning">
                      {this.state.errMsg}
                      {"!"}
                    </p>
                  ) : (
                    <p className="text-danger">{this.state.succsessMsg}</p>
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
                    navigate("/login");
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

export default withNavigate(Register);
