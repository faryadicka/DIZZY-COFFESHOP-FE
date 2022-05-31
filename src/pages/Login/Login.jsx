import { Link, Navigate } from "react-router-dom";
import React, { Component } from "react";

// assets
import "../Login/Login.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPass: false,
      isError: false,
      errMsg: "",
      succsessMsg: "",
      isSuccess: false,
      token: localStorage.getItem("sign-payload"),
    };
  }

  loginAuth = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    this.setState({
      email,
      password,
    });
    const URL = "http://localhost:5000/api/auth/login";
    if (email && password) {
      axios
        .post(URL, this.state)
        .then((res) => {
          this.setState({
            isError: false,
            succsessMsg: res.data.message,
            isSuccess: true,
          });
          console.log(this.state);
          localStorage.setItem("sign-payload", res.data.data.token);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            isError: true,
            errMsg: err.response.data.message,
          });
        });
    }
    // const token = localStorage.getItem("sign-payload");
  };
  render() {
    if (this.state.isSuccess) return <Navigate to="/" />;
    return (
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
            <form className="main-form-auth" onSubmit={this.loginAuth}>
              <label className="label-auth" htmlFor="email">
                Email Address :
              </label>
              <input
                className="input-auth"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
              <label className="label-auth" htmlFor="password">
                Password :
              </label>
              <input
                className="input-auth"
                type={`${this.state.showPass ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <label>
                <input
                  type="checkbox"
                  value={this.state.showPass}
                  onChange={() => {
                    this.setState({
                      showPass: !this.state.showPass,
                    });
                  }}
                />{" "}
                Show Password
              </label>
              {this.state.isError ? (
                <p className="text-warning">
                  {this.state.errMsg}
                  {"!"}
                </p>
              ) : (
                <p className="text-success">{this.state.succsessMsg}</p>
              )}
              <Link to="/" className="mt-2 forgot-password">
                Forgot password?
              </Link>
              <button className="button-auth normal" type="submit">
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
              <Link to="/register" className="button-auth login">
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
    );
  }
}
