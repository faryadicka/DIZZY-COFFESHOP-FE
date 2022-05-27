import React, { Component } from "react";

// assets
import Navbar from "../../components/Navbars/Navbars";
import Footer from "../../components/Footer/Footer";
import { BrowserRouter as Router, Link } from "react-router-dom";

export class ProductDetail extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <main className="main-product-detail">
            <div className="container">
              <div className="row link-product-detail">
                <div className="m-0 col-4">
                  <Link className="text-decoration-none text-dark" to="#">
                    Favorite & Promo
                  </Link>
                  <span className="fw-bold"> > Cold Brew</span>
                </div>
              </div>
            </div>
          </main>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default ProductDetail;
