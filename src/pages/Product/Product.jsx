import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduct from "../../components/CardProducts/CardProduct";
import NavbarHome from "../../components/NavbarHome/Navbar";
// assets
import "../Product/Product.scoped.css";
import MothersDay from "../../assets/img/ava-coupon-3.png";
import SundayMorning from "../../assets/img/ava-coupon-2.png";
import HalloweenDay from "../../assets/img/ava-coupon-1.png";

import withSearchParams from "../../helpers/withSearchParams";
import withLocation from "../../helpers/withLocation";
import withParams from "../../helpers/withParams";

// axios
import {
  getFavorite,
  getProducts,
  sortProductsMinPrice,
  sortProductsMaxPrice,
} from "../../services/product";
import withNavigate from "../../helpers/withNavigate";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token") || "",
      role: localStorage.getItem("role") || null,
      modalShow: false,
      nextLink: null,
      prevLink: null,
      totalPage: 0,
      isActiveFav: false,
      products: {
        favorite: [],
        minPrice: [],
        maxPrice: [],
        pagination: [],
        coffee: [],
        nonCoffee: [],
        foods: [],
      },
    };
  }

  getCoffee = async (category, search) => {
    await getProducts(category, search)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, coffee: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  getNonCoffee = async (category, search) => {
    await getProducts(category, search)
      .then((res) => {
        // console.log(res.data.data);
        this.setState({
          products: { ...this.state.products, nonCoffee: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  getFoods = async (category, search) => {
    await getProducts(category, search)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, foods: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  getFav = async () => {
    await getFavorite()
      .then((res) => {
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

  getProductsPagination = (category, search, page) => {
    getProducts(category, search, page)
      .then((res) => {
        this.setState({
          products: { ...this.state.products, pagination: res.data.data },
        });
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  handleMinPrice = (event) => {
    event.preventDefault();
    const { navigate } = this.props;
    sortProductsMinPrice()
      .then((res) => {
        console.log(res);
        this.setState({
          products: { ...this.state.products, minPrice: res.data.data },
        });
        navigate("/products?sort=price&order=asc");
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  handleMaxPrice = (event) => {
    event.preventDefault();
    const { navigate } = this.props;
    sortProductsMaxPrice()
      .then((res) => {
        console.log(res);
        this.setState({
          products: { ...this.state.products, maxPrice: res.data.data },
        });
        navigate("/products?sort=price&order=desc");
      })
      .catch((err) => {
        console.log("ERROR SEARCH PRODUCT", err);
      });
  };

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const name = search.slice(24) || "";
    await this.getCoffee("1", name);
    await this.getNonCoffee("2", name);
    await this.getFoods("3", name);
    await this.getFav();
  }
  componentDidUpdate(prevProps) {
    const {
      // location: { search },
      searchParams,
      // params,
    } = this.props;
    const category = searchParams.get("category") || "";
    const page = searchParams.get("page") || "1";
    const name = searchParams.get("name") || "";
    if (prevProps.searchParams !== searchParams) {
      this.getProductsPagination(category, name, page);
    }
    // if (prevProps.params !== params) {
    //   this.getFav();
    // }
  }

  render() {
    const {
      location: { search },
      searchParams,
    } = this.props;
    const category = search.slice(10, 11) || "";
    const page = search.slice(17, 18) || "1";
    const name = search.slice(24) || "";
    const {
      pagination,
      favorite,
      minPrice,
      maxPrice,
      coffee,
      nonCoffee,
      foods,
    } = this.state.products;
    console.log(pagination);
    console.log(searchParams.get("name"));
    return (
      <>
        {this.state.token ? (
          <Navbar category={category} name={name} page={page} />
        ) : (
          <NavbarHome />
        )}
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
                {this.state.role !== "1" ? (
                  <></>
                ) : (
                  <div className="coupon-button d-flex justify-content-around mt-5">
                    <button className="btn btn-choco">Edit Promo</button>
                    <button className="btn btn-choco">Create Promo</button>
                  </div>
                )}
              </div>
              <div className="col-md-8 p-5 column-products">
                <ul className="row text-center mt-3 justify-content-between wrapper-menu-category">
                  <li className="col-2 col-lg-2 link-category">
                    <Dropdown className="rounded-4">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        SORT
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <button
                          className="btn border-0"
                          onClick={this.handleMinPrice}
                        >
                          Min Price
                        </button>
                        <button
                          className="btn border-0"
                          onClick={this.handleMaxPrice}
                        >
                          Max Price
                        </button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li className="col-3 col-lg-3 link-category">
                    <Link
                      to="/products/favorite"
                      className={`${
                        searchParams.get("category") === null
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Favorite & Promo
                    </Link>
                  </li>
                  <li className="col-2 col-lg-2 link-category">
                    <Link
                      to="/products?category=1&page=1"
                      className={`${
                        searchParams.get("category") === "1"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Coffee
                    </Link>
                  </li>
                  <li className="col-2 col-lg-2 link-category">
                    <Link
                      to="/products?category=2&page=1"
                      className={`${
                        searchParams.get("category") === "2"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Non Coffee
                    </Link>
                  </li>
                  <li className="col-2 col-lg-2 link-category">
                    <Link
                      to="/products?category=3&page=1"
                      className={`${
                        searchParams.get("category") === "3"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Foods
                    </Link>
                  </li>
                </ul>
                <div className="row mt-5 justify-content-center">
                  {searchParams.get("category") === "1"
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
                    ? nonCoffee.map((item) => {
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
                    : searchParams.get("order") === "asc"
                    ? minPrice.map((item) => {
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
                    : searchParams.get("order") === "desc"
                    ? maxPrice.map((item) => {
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
                    : searchParams.get("name") === search.slice(24)
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
                    : favorite.map((item) => {
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
                <div className="row pagination justify-content-around">
                  {this.state.role !== "1" ? (
                    <></>
                  ) : (
                    <div className="col-auto">
                      <button className="btn btn-choco">EDIT PRODUCT</button>
                    </div>
                  )}
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
                  {this.state.role !== "1" ? (
                    <></>
                  ) : (
                    <div className="col-auto">
                      <button className="btn btn-choco">CREATE PRODUCT</button>
                    </div>
                  )}
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

export default withNavigate(
  withLocation(withSearchParams(withParams(Product)))
);
