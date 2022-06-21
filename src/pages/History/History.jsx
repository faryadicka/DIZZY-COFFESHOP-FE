import React, { Component } from "react";
// Component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import NavbarHome from "../../components/NavbarHome/Navbar";
import CardHistory from "../../components/CardHistory/CardHistory";
// Assets
import "../History/History.scoped.css";

import { getAllhistories, softDeleteHistories } from "../../services/history";
import { connect } from "react-redux";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    this.handleDeleteProduct.bind(this);
  }

  handleDeleteProduct = (id) => {
    softDeleteHistories(this.state.token, id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const newHistory = this.state.history.filter((item) => {
      return item.id !== id;
    });
    this.setState({
      history: newHistory,
    });
  };

  getHistoryProducts = (token) => {
    getAllhistories(token)
      .then((res) => {
        this.setState({
          history: res.data.data,
        });
      })
      .catch((err) => {
        console.log("GET DATA TRANSACTION FAILED", err);
      });
  };

  componentDidMount() {
    const { token } = this.props;
    console.log(token);
    if (token !== null) {
      this.getHistoryProducts(token);
      // console.log(token);
    }
  }
  render() {
    const { token } = this.props;
    return (
      <>
        {token ? <Navbar /> : <NavbarHome />}
        <main className="main-history mt-5">
          <div className="container">
            <div className="row">
              <h1 className="history-title text-center text-white">
                Let’s see what you have bought!
                <br />{" "}
                <span className="guide-history">Select item to delete</span>
              </h1>
            </div>
            <div className="row justify-content-center gap-3 mt-5">
              {this.state.history.length === 0 ? (
                <p className="text-white fw-bold fs-6 text-center">
                  NO PRODUCTS HAVE BEEN PURCHASE
                </p>
              ) : (
                this.state.history.map((item) => {
                  return (
                    <CardHistory
                      image={`${item.image}`}
                      name={item.name}
                      price={`IDR ${item.price}`}
                      status="Delivery"
                      key={item.id}
                      onDeleteCard={this.handleDeleteProduct}
                      id={item.id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    auth: {
      authData: { token },
    },
  } = state;
  return {
    token,
  };
};

export default connect(mapStateToProps)(History);
