import React, { Component } from "react";
import axios from "axios";
// Component
import Navbars from "../../components/Navbars/Navbars";
import Footer from "../../components/Footer/Footer";
import CardProduct from "../../components/CardProducts/CardProduct";

// assets
import "../Product/Product.scoped.css";
import MothersDay from "../../assets/img/ava-coupon-3.png";
import SundayMorning from "../../assets/img/ava-coupon-2.png";
import HalloweenDay from "../../assets/img/ava-coupon-1.png";
// import ProductImg from "../../assets/img/creamyice.png";

export default class Product extends Component {
  state = {
    product: {
      coffe: [],
      nonCoffee: [],
      foods: [],
    },
  };
  getCoffee = (category) => {
    const URL = `http://localhost:5000/api/products?category=${category}&page=1&limit=16`;
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          product: { ...this.product, coffee: res.data.data },
        });
      })
      .catch((error) => {
        console.log("ERROR GET FAFORITE PRODUCTS", error);
      });
  };
  getNonCoffee = (category) => {
    const URL = `http://localhost:5000/api/products?category=${category}&page=1&limit=16`;
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          product: { ...this.product, nonCoffee: res.data.data },
        });
      })
      .catch((error) => {
        console.log("ERROR GET FAFORITE PRODUCTS", error);
      });
  };
  getFoods = (category) => {
    const URL = `http://localhost:5000/api/products?category=${category}&page=1&limit=16`;
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          product: { ...this.product, foods: res.data.data },
        });
      })
      .catch((error) => {
        console.log("ERROR GET FAFORITE PRODUCTS", error);
      });
  };
  componentDidMount() {
    this.getCoffee("1");
    this.getNonCoffee("2");
    this.getFoods("3");
  }
  render() {
    return (
      <>
        <Navbars />
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 p-5 column-coupon">
                <h4 className="first-column-products fw-bold mt-2 text-center align-items-center">
                  Promo Today
                </h4>
                <p className="coupon-info text-center">
                  Coupons will be updated every weeks. Check them out!
                </p>
                <div className="card text-bg-green mb-3 p-1 border-0">
                  <div className="card-body-coupon">
                    <img src={MothersDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY MOTHER’S DAY!
                      <br />
                      Get one of our favorite menu for free!
                    </p>
                  </div>
                </div>
                <div className="card text-bg-cream mb-3 p-1 border-0">
                  <div className="card-body-coupon">
                    <img src={SundayMorning} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      Get a cup of coffee for free on sunday morning Only at 7
                      to 9 AM
                    </p>
                  </div>
                </div>
                <div className="card text-bg-green mb-3 p-1 border-0">
                  <div className="card-body-coupon">
                    <img src={MothersDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY MOTHER’S DAY!
                      <br />
                      Get one of our favorite menu for free!
                    </p>
                  </div>
                </div>
                <div className="card text-bg-choco mb-1 p-1 border-0">
                  <div className="card-body-coupon">
                    <img src={HalloweenDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY HALLOWEEN! Do you like chicken wings? Get 1 free
                      only if you buy pinky promise
                    </p>
                  </div>
                </div>
                <button type="button" class="btn btn-choco-coupon mt-5">
                  Apply Coupon
                </button>
                <div class="terms-condition">
                  <p class="desc-coupon mt-4">
                    Terms and Condition
                    <br />
                    1. You can only apply 1 coupon per day
                    <br />
                    2. It only for dine in
                    <br />
                    3. Buy 1 get 1 only for new user
                    <br />
                    4. Should make member card to apply coupon
                    <br />
                  </p>
                </div>
              </div>
              <div className="col-md-8 p-5 column-products">
                <div className="row text-center mt-3 justify-content-between">
                  <div className="col-3 col-lg-3">
                    <button className="menu-products">
                      <p className="title-category">Favorite & Promo</p>
                    </button>
                  </div>
                  <div className="col-2 col-lg-2">
                    <button className="menu-products">
                      <p className="title-category">Coffee</p>
                    </button>
                  </div>
                  <div className="col-2 col-lg-2">
                    <button className="menu-products">
                      <p className="title-category">Non Coffee</p>
                    </button>
                  </div>
                  <div className="col-2 col-lg-2">
                    <button className="menu-products">
                      <p className="title-category">Foods</p>
                    </button>
                  </div>
                  <div className="col-3 col-lg-2">
                    <button className="menu-products">
                      <p className="title-category">Add-on</p>
                    </button>
                  </div>
                </div>
                <div class="row mt-5 justify-content-center">
                  {this.getCoffee("1")
                    ? this.product.coffee.map((item) => {
                        return (
                          <CardProduct
                            image={item.image}
                            title={item.name}
                            price={item.price}
                            key={item.id}
                          />
                        );
                      })
                    : this.getNonCoffee("2")
                    ? this.product.nonCoffee.map((item) => {
                        return (
                          <CardProduct
                            image={item.image}
                            title={item.name}
                            price={item.price}
                            key={item.id}
                          />
                        );
                      })
                    : this.getFoods("3")
                    ? this.product.nonCoffee.map((item) => {
                        return (
                          <CardProduct
                            image={item.image}
                            title={item.name}
                            price={item.price}
                            key={item.id}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
