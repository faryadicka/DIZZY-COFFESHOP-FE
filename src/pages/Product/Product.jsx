import React, { Component } from "react";
import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduct from "../../components/CardProducts/CardProduct";
// import CostumLink from "../../components/CostumLink/CostumLink";

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
  getAllProduct,
  getFavorite,
  getProduct,
  getSearch,
} from "../../services/product";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextLink: null,
      prevLink: null,
      totalPage: 0,
      isActiveFav: false,
      products: {
        favorite: [],
        coffee: [],
        nonCoffe: [],
        foods: [],
        search: [],
        allProducts: [],
        pagination: [],
      },
    };
  }

  getAllProductsPage = () => {
    getAllProduct()
      .then((res) => {
        // console.log(res.data);
        const nextLink = res.data.nextLink ? res.data.nextLink.slice(25) : null;
        const prevLink = res.data.prevLink ? res.data.prevLink.slice(25) : null;
        this.setState({
          nextLink,
          prevLink,
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
        console.log(res.data);
        const nextLink = res.data.nextLink ? res.data.nextLink.slice(25) : null;
        const prevLink = res.data.prevLink ? res.data.prevLink.slice(25) : null;
        this.setState({
          nextLink,
          prevLink,
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
        console.log(res.data);
        const nextLink = res.data.nextLink ? res.data.nextLink.slice(25) : null;
        const prevLink = res.data.prevLink ? res.data.prevLink.slice(25) : null;
        this.setState({
          nextLink,
          prevLink,
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
        console.log(res.data);
        const nextLink = res.data.nextLink ? res.data.nextLink.slice(25) : null;
        const prevLink = res.data.prevLink ? res.data.prevLink.slice(25) : null;
        this.setState({
          nextLink,
          prevLink,
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
        console.log(res.data);
        const nextLink = res.data.nextLink ? res.data.nextLink.slice(25) : null;
        const prevLink = res.data.prevLink ? res.data.prevLink.slice(25) : null;
        this.setState({
          nextLink,
          prevLink,
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
    const {
      location: { search },
    } = this.props;
    this.getAllProductsPage();
    if (search) {
      this.getPaginationPage(search.slice(6));
    }
  }
  componentDidUpdate(prevProps) {
    const { location, searchParams, params } = this.props;
    if (prevProps.searchParams !== searchParams) {
      this.getCoffee("1");
      this.getNonCoffee("2");
      this.getFoods("3");
      this.getSearchProduct(location.search.slice(6));
    }
    if (prevProps.params !== params) {
      this.getFav();
    }
  }

  render() {
    let { searchParams, location, params } = this.props;
    const {
      favorite,
      coffee,
      nonCoffe,
      foods,
      search,
      allProducts,
      pagination,
    } = this.state.products;
    console.log(this.state);
    return (
      <>
        <Navbar />
        <main className="margin-main-top">
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
                      Favorite & Promo
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=1" className="menu-products">
                      Coffee
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=2" className="menu-products">
                      Non Coffee
                    </Link>
                  </div>
                  <div className="col-2 col-lg-2">
                    <Link to="/products?category=3" className="menu-products">
                      Foods
                    </Link>
                  </div>
                  <div className="col-3 col-lg-2">
                    <Link to="/products" className="menu-products">
                      All
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
                    : searchParams.get("page") === location.search.slice(6)
                    ? pagination.map((item) => {
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
                <div className="row pagination justify-content-center">
                  <div className="col-auto">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link
                            to={`${this.state.prevLink}`}
                            className="page-link text-choco"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link to="/" className="page-link text-choco">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link to="/" className="page-link text-choco">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link to="/" className="page-link text-choco">
                            3
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link
                            to={`${this.state.nextLink}`}
                            className="page-link text-choco"
                            aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
