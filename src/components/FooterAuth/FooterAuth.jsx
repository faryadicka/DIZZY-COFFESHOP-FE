// Assets
import "./FooterAuth.scoped.css";
import Logo from "../../assets/img/logo.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";

import React from "react";

export default function FooterAuth() {
  return (
    <footer className="footer-content-signup mb-5">
      <div className="footer-side">
        <div className="footer-title-signup">
          <img src={Logo} alt="logo-coffeschop" />
          <p className="footer-title">Dizzy Coffee Shop</p>
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
        <div className="product-info-signup">
          <p className="info-detail">Download</p>
          <p className="info-detail">Pricing</p>
          <p className="info-detail">Location</p>
          <p className="info-detail">Countries</p>
          <p className="info-detail">Blog</p>
        </div>
        <p className="title-info-footer">Engange</p>
        <div className="product-info-signup">
          <p className="info-detail">Coffee Shop?</p>
          <p className="info-detail">About Us</p>
          <p className="info-detail">FAQ</p>
          <p className="info-detail">Privacy Policy</p>
          <p className="info-detail">Term of Services</p>
        </div>
      </div>
    </footer>
  );
}
