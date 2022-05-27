import React, { Component } from "react";

// Assets
import "../Footer/FooterAuth.scoped.css";
import Logo from "../../assets/img/logo.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";

export default class FooterAuth extends Component {
  render() {
    return (
      <footer class="footer-content-signup mb-5">
        <div class="footer-side">
          <div class="footer-title-signup">
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
          <div class="product-info-signup">
            <p class="info-detail">Download</p>
            <p class="info-detail">Pricing</p>
            <p class="info-detail">Location</p>
            <p class="info-detail">Countries</p>
            <p class="info-detail">Blog</p>
          </div>
          <p class="title-info-footer">Engange</p>
          <div class="product-info-signup">
            <p class="info-detail">Coffee Shop?</p>
            <p class="info-detail">About Us</p>
            <p class="info-detail">FAQ</p>
            <p class="info-detail">Privacy Policy</p>
            <p class="info-detail">Term of Services</p>
          </div>
        </div>
      </footer>
    );
  }
}
