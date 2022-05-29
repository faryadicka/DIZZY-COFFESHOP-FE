import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// assets
import "../Register/Register.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        phone: "",
      },
    };
  }

  registerAuth = () => {
    const URL = "http://localhost:5000/api/auth/register";
    axios.post(URL, this.state);
  };

  render() {
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
                <p>Dizzy Coffee Shop</p>
              </Link>
              <p className="header-title-auth">Sign Up</p>
            </header>
            <form className="main-form-auth">
              <label className="label-auth" for="email">
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
              <label className="label-auth" for="password">
                Password :
              </label>
              <input
                className="input-auth"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(event) => {
                  this.setState({
                    password: event.target.value,
                  });
                }}
              />
              <label className="label-auth" for="phone">
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
                onClick={this.registerAuth}
              >
                Sign Up
              </button>
              <button className="button-auth google" type="submit">
                <img className="google-button" src={Google} alt="google-logo" />{" "}
                Sign Up with Google
              </button>
              <section className="has-account">
                <div className="underline"></div>
                <p className="already-account">Already have an account?</p>
                <div className="underline"></div>
              </section>
              <Link to="/login">
                <button className="button-auth login">Login</button>
              </Link>
            </form>
          </main>
          <footer className="footer-content-auth">
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
    );
  }
}
