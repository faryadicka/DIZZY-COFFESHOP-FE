import React from "react";

// assets
import "../Register/Register.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";

export default function Register() {
  return (
    <div className="container-auth">
      <aside className="picture">
        <img className="image-aside-auth" src={Banner} alt="auth-aside" />
      </aside>
      <div class="containter-main-footer-auth">
        <main class="main-auth">
          <header class="main-header-auth">
            <a href="index.html">
              <img src={Logo} alt="logo-coffeeshop" />
            </a>
            <a href="index.html" class="header-brand-auth">
              <p>Dizzy Coffee Shop</p>
            </a>
            <p class="header-title-auth">Sign Up</p>
          </header>
          <form class="main-form-auth">
            <label class="label-auth" for="email">
              Email Address :
            </label>
            <input
              class="input-auth"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
            />
            <label class="label-auth" for="password">
              Password :
            </label>
            <input
              class="input-auth"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            <label class="label-auth" for="phone">
              Phone Number :
            </label>
            <input
              class="input-auth"
              type="phone"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
            />
            <button class="button-auth normal" type="submit">
              Sign Up
            </button>
            <button class="button-auth google" type="submit">
              <img class="google-button" src={Google} alt="google-logo" /> Sign
              Up with Google
            </button>
            <section class="has-account">
              <div class="underline"></div>
              <p class="already-account">Already have an account?</p>
              <div class="underline"></div>
            </section>
            <button class="button-auth login" type="submit">
              Login
            </button>
          </form>
        </main>
        <footer class="footer-content-auth">
          <div class="footer-side">
            <div class="footer-title-auth">
              <img src={Logo} alt="logo-coffeschop" />
              <p class="footer-title">Dizzy Coffee Shop</p>
            </div>
            <p class="footer-desc">
              Coffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans
            </p>
            <div class="footer-logo">
              <img src={Facebook} alt="facebook-logo" />
              <img src={Twitter} alt="twitter-logo" />
              <img src={Instagram} alt="instagram-logo" />
            </div>
            <p class="copy-right">©DIZZY COFFEE SHOP</p>
          </div>
          <div class="footer-info">
            <p class="title-info-footer">Product</p>
            <ul class="product-info-auth">
              <li class="info-detail">Download</li>
              <li class="info-detail">Pricing</li>
              <li class="info-detail">Location</li>
              <li class="info-detail">Countries</li>
              <li class="info-detail">Blog</li>
            </ul>
            <p class="title-info-footer">Engange</p>
            <ul class="product-info-auth">
              <li class="info-detail">Coffee Shop?</li>
              <li class="info-detail">About Us</li>
              <li class="info-detail">FAQ</li>
              <li class="info-detail">Privacy Policy</li>
              <li class="info-detail">Term of Services</li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}
