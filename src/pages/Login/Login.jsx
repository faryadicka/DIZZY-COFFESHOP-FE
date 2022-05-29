import React from "react";
import { Link } from "react-router-dom";

// assets
import "../Login/Login.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";

export default function Login() {
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
            />
            <p className="forgot-password">Forgot password?</p>
            <button className="button-auth normal" type="submit">
              Login
            </button>
            <button className="button-auth google" type="submit">
              <img className="google-button" src={Google} alt="google-logo" />{" "}
              Login with Google
            </button>
            <section className="has-account">
              <div className="underline"></div>
              <p className="already-account">Already have an account?</p>
              <div className="underline"></div>
            </section>
            <button className="button-auth login" type="submit">
              Sign Up Here
            </button>
          </form>
        </main>
        <footer className="footer-content-auth">
          <div className="footer-side">
            <div className="footer-title-auth">
              <img src={Logo} alt="logo-coffeschop" />
              <p className="footer-title">DIZZY COFFE SHOP</p>
            </div>
            <p className="footer-desc">
              Coffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans
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
