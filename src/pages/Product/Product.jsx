import React, { Component } from "react";
import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduct from "../../components/CardProducts/CardProduct";

// assets
import "../Product/Product.scoped.css";
import MothersDay from "../../assets/img/ava-coupon-3.png";
import SundayMorning from "../../assets/img/ava-coupon-2.png";
import HalloweenDay from "../../assets/img/ava-coupon-1.png";
// import ProductImg from "../../assets/img/creamyice.png";

import withSearchParams from "../../helpers/withSearchParams";
import withLocation from "../../helpers/withLocation";
import withParams from "../../helpers/withParams";

// axios
import {
  getProduct,
  getFavorite,
  getSearch,
  getAllProduct,
} from "../../services/product";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        favorite: [],
        coffee: [],
        nonCoffe: [],
        foods: [],
        search: [],
        allProducts: [],
      },
    };
  }

  getAllProductsPage = () => {
    getAllProduct()
      .then((res) => {
        this.setState({
          products: { ...this.state.products, allProducts: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR GET PRODUCTS", err);
      });
  };

  getFav = () => {
    getFavorite()
      .then((res) => {
        this.setState({
          products: { ...this.state.products, favorite: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR GET PRODUCTS", err);
      });
  };

  getCoffee = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, coffee: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR GET PRODUCTS", err);
      });
  };

  getNonCoffee = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, nonCoffe: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR GET PRODUCTS", err);
      });
  };

  getFoods = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, foods: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR GET PRODUCTS", err);
      });
  };

  getSearchProduct = (search) => {
    getSearch(search)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, search: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  componentDidMount() {
    this.getAllProductsPage();
  }
  componentDidUpdate(prevProps) {
    const {
      location: { search },
      searchParams,
      params,
    } = this.props;
    if (prevProps.searchParams !== searchParams) {
      this.getCoffee("1");
      this.getNonCoffee("2");
      this.getFoods("3");
      this.getSearchProduct(search.slice(6));
    }
    if (prevProps.params !== params) {
      this.getFav();
    }
  }
  render() {
    let { searchParams, location, params } = this.props;
    const { favorite, coffee, nonCoffe, foods, search, allProducts } =
      this.state.products;
    // console.log(params);
    return (
      <>
        <Navbar searchParams={searchParams.get("name")} />
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 p-5 column-coupon">
                <h4 className="first-column-products fw-bold mt-2 text-center align-items-center">
                  Promo Today
                </h4>
                <p className="coupon-info text-center">
                  Coupons will be updated every weeks. Check them out!
                </p>
                <div className="card text-bg-green mb-3 p-1 w-100 border-0">
                  <div className="card-body-coupon">
                    <img src={MothersDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY MOTHER’S DAY!
                      <br />
                      Get one of our favorite menu for free!
                    </p>
                  </div>
                </div>
                <div className="card text-bg-cream mb-3 p-1 w-100 border-0">
                  <div className="card-body-coupon">
                    <img src={SundayMorning} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      Get a cup of coffee for free on sunday morning Only at 7
                      to 9 AM
                    </p>
                  </div>
                </div>
                <div className="card text-bg-green mb-3 p-1 w-100 border-0">
                  <div className="card-body-coupon">
                    <img src={MothersDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY MOTHER’S DAY!
                      <br />
                      Get one of our favorite menu for free!
                    </p>
                  </div>
                </div>
                <div className="card text-bg-choco mb-1 p-1 w-100 border-0">
                  <div className="card-body-coupon">
                    <img src={HalloweenDay} alt="ava-coupon" />
                    <p className="card-text-coupon">
                      HAPPY HALLOWEEN! Do you like chicken wings? Get 1 free
                      only if you buy pinky promise
                    </p>
                  </div>
                </div>
                <button type="button" className="btn btn-choco-coupon mt-5">
                  Apply Coupon
                </button>
                <div className="terms-condition">
                  <p className="desc-coupon mt-4">
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
                    <Link to="/products/favorite" className="menu-products">
                      <p className="title-category">Favorite & Promo</p>
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=1" className="menu-products">
                      <p className="title-category">Coffee</p>
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=2" className="menu-products">
                      <p className="title-category">Non Coffee</p>
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=3" className="menu-products">
                      <p className="title-category">Foods</p>
                    </Link>
                  </div>
                  <div className="col-3 col-lg-2">
                    <Link to="/products" className="menu-products">
                      <p className="title-category">All</p>
                    </Link>
                  </div>
                </div>
                <div className="row mt-5 justify-content-center">
                  {params.favorite === "favorite"
                    ? favorite.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })
                    : searchParams.get("name") === location.search.slice(6)
                    ? search.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })
                    : searchParams.get("category") === "1"
                    ? coffee.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })
                    : searchParams.get("category") === "2"
                    ? nonCoffe.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })
                    : searchParams.get("category") === "3"
                    ? foods.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })
                    : allProducts.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`http://localhost:5000${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                          />
                        );
                      })}
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

export default withLocation(withSearchParams(withParams(Product)));
