import React from "react";
import { Link } from "react-router-dom";

// assets
import "../Footer/Footer.scoped.css";
import Logo from "../../assets/img/logo.png";
import Instagram from "../../assets/img/instagram.png";
import Facebook from "../../assets/img/facebook.png";
import Twitter from "../../assets/img/twitter.png";

export default function Footer() {
  return (
    <footer className="footer-products">
      <div className="row justify-content-between">
        <div className="col-md-6 col-lg-4">
          <div className="footer-side">
            <div className="footer-title-component">
              <img src={Logo} alt="logo-coffeschop" />
              <p className="footer-title"> Dizzy Coffee Shop</p>
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
        </div>
        <div className="col-md-6 mt-3">
          <div className="row justify-content-center">
            <div className="col-6 col-md-4">
              <ul className="list-footer-product">
                <li className="list-title-footer">Products</li>
                <Link to="/">
                  <li>Download</li>
                </Link>
                <Link to="/">
                  <li>Pricing</li>
                </Link>
                <Link to="/">
                  <li>Locations</li>
                </Link>
                <Link to="/">
                  <li>Countries</li>
                </Link>
                <Link to="/">
                  <li>Blog</li>
                </Link>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-footer-product">
                <li className="list-title-footer">Engage</li>
                <Link to="/">
                  <li>Coffee Shop ?</li>
                </Link>
                <Link to="/">
                  <li>FAQ</li>
                </Link>
                <Link to="/">
                  <li>About Us</li>
                </Link>
                <Link to="/">
                  <li>Privacy Policy</li>
                </Link>
                <Link to="/">
                  <li>Terms of Services</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
