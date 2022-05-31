import React, { Component } from "react";
// Component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CardHistory from "../../components/CardHistory/CardHistory";
// Assets
import "../History/History.scoped.css";

import { getAllhistories } from "../../services/history";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  getHistoryProducts = () => {
    getAllhistories()
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          history: res.data.data,
        });
      })
      .catch((err) => {
        console.log("GET DATA TRANSACTION FAILED", err);
      });
  };

  componentDidMount() {
    this.getHistoryProducts();
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
                <span className="guide-history">Select item to delete</span>
              </h1>
            </div>
            <div className="row justify-content-center gap-3 mt-5">
              {this.state.history.map((item) => {
                return (
                  <CardHistory
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    status="Delivery"
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
