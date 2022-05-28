import React, { Component } from "react";
// Component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CardHistory from "../../components/CardHistory/CardHistory";
// Assets
import "../History/History.scoped.css";
import ImageHistory from "../../assets/img/img-history.png";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navbar />
        <main className="main-history">
          <div className="container">
            <div className="row">
              <h1 className="history-title text-center text-white">
                Let’s see what you have bought!
                <br />{" "}
                <span className="guide-history">Long press to delete item</span>
              </h1>
            </div>
            <div className="row justify-content-center gap-3 mt-5">
              <CardHistory
                image={ImageHistory}
                name="Veggie Tomato Mix"
                price="IDR 34.000"
                status="Delivery"
              />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
