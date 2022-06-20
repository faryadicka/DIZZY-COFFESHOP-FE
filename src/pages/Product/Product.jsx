import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";

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

import withNavigate from "../../helpers/withNavigate";

//redux
import {
  getFavoriteRedux,
  sortByPriceRedux,
  nextLinkRedux,
  getFixProductsRedux,
} from "../../redux/actionCreator/product";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      nextLink: null,
      prevLink: null,
      totalPage: 0,
      isActiveFav: false,
      currentPage: 0,
      showButton: false,
    };
  }

  handleMinPrice = (event) => {
    event.preventDefault();
    const { setSearchParams, dispatch } = this.props;
    dispatch(sortByPriceRedux("ASC"));
    setSearchParams({ sort: "price", order: "asc" });
  };

  handleMaxPrice = (event) => {
    event.preventDefault();
    const { dispatch, setSearchParams } = this.props;
    dispatch(sortByPriceRedux("DESC"));
    setSearchParams({ sort: "price", order: "desc" });
  };

  handleNextLink = (event) => {
    event.preventDefault();
    const { dispatch, searchParams, setSearchParams, currentPage, totalPage } =
      this.props;
    if (currentPage !== totalPage) {
      dispatch(
        nextLinkRedux(
          searchParams.get("category") || "",
          searchParams.get("name") || "",
          searchParams.get("sort") || "name",
          searchParams.get("order") || "asc",
          searchParams.get("page") || "1"
        )
      );
      setSearchParams({ page: currentPage + 1 });
      window.scrollTo(0, 0);
    }
  };

  handlePrevLink = (event) => {
    event.preventDefault();
    const { dispatch, searchParams, setSearchParams, currentPage } = this.props;
    if (currentPage > 1) {
      dispatch(
        nextLinkRedux(
          searchParams.get("category") || "",
          searchParams.get("name") || "",
          searchParams.get("sort") || "name",
          searchParams.get("order") || "asc",
          searchParams.get("page") || "1"
        )
      );
      setSearchParams({ page: currentPage - 1 });
      window.scrollTo(0, 0);
    }
  };

  componentDidMount() {
    const { searchParams, dispatch } = this.props;
    dispatch(
      getFixProductsRedux(
        searchParams.get("category") || "",
        searchParams.get("name") || "",
        searchParams.get("sort") || "name",
        searchParams.get("order") || "asc"
      )
    );
    dispatch(getFavoriteRedux());
  }
  componentDidUpdate(prevProps) {
    const { searchParams, dispatch } = this.props;
    if (prevProps.searchParams !== searchParams) {
      dispatch(
        getFixProductsRedux(
          searchParams.get("category") || "",
          searchParams.get("name") || "",
          searchParams.get("sort") || "name",
          searchParams.get("order") || "asc"
        )
      );
    }
  }

  render() {
    const {
      params,
      searchParams,
      products,
      favorite,
      price,
      totalPage,
      navigate,
      authData: { role, token },
    } = this.props;
    const { showButton } = this.state;
    const category = searchParams.get("category") || "1";
    const page = searchParams.get("page") || "1";
    const name = searchParams.get("name") || "";
    const sort = searchParams.get("sort") || "name";
    const order = searchParams.get("order") || "asc";
    return (
      <>
        {token ? (
          <Navbar
            category={category}
            name={name}
            sort={sort}
            order={order}
            page={page}
          />
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
                {role !== 1 ? (
                  <></>
                ) : (
                  <div className="coupon-button d-flex justify-content-around mt-5">
                    <button className="btn btn-dark">Edit Promo</button>
                    <button
                      onClick={() => {
                        navigate(`/promos/create`);
                        window.scrollTo(0, 0);
                      }}
                      className="btn btn-dark"
                    >
                      Create Promo
                    </button>
                  </div>
                )}
              </div>
              <div className="col-md-8 p-5 column-products">
                <Dropdown className="rounded-4">
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
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
                <ul className="row text-center mt-3 justify-content-between wrapper-menu-category">
                  <li className="col-3 col-lg-3 link-category">
                    <Link
                      to="/products/favorite"
                      className={`${
                        params.favorite === "favorite"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Favorite & Promo
                    </Link>
                  </li>
                  <li className="col-2 col-lg-2 link-category">
                    <Link
                      to="/products?category=1&sort=name&order=asc&page=1"
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
                      to="/products?category=2&sort=name&order=asc&page=1"
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
                      to="/products?category=3&sort=name&order=asc&page=1"
                      className={`${
                        searchParams.get("category") === "3"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      Foods
                    </Link>
                  </li>
                  <li className="col-2 col-lg-2 link-category">
                    <Link
                      to="/products?"
                      className={`${
                        searchParams.get("category") === null &&
                        params.favorite !== "favorite"
                          ? "menu-products-active"
                          : "menu-products"
                      }`}
                    >
                      All
                    </Link>
                  </li>
                </ul>
                <div className="row mt-5 justify-content-center">
                  {searchParams.get("category") &&
                  searchParams.get("name") !== ""
                    ? products.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={showButton}
                          />
                        );
                      })
                    : searchParams.get("order") === "asc"
                    ? price.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={showButton}
                          />
                        );
                      })
                    : searchParams.get("order") === "desc"
                    ? price.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={showButton}
                          />
                        );
                      })
                    : params.favorite === "favorite"
                    ? favorite.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={showButton}
                          />
                        );
                      })
                    : products.map((item) => {
                        return (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={showButton}
                          />
                        );
                      })}
                </div>
                <div className="row pagination justify-content-center">
                  {role !== 1 ? (
                    <></>
                  ) : (
                    <div className="col-auto">
                      <button
                        onClick={() => {
                          if (!showButton) {
                            return this.setState({
                              showButton: true,
                            });
                          }
                          return this.setState({
                            showButton: false,
                          });
                        }}
                        className="btn btn-dark"
                      >
                        EDIT PRODUCT
                      </button>
                    </div>
                  )}
                  <div className="col-auto">
                    {totalPage > 1 ? (
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <Link
                              to="#"
                              onClick={this.handlePrevLink}
                              className="page-link text-choco"
                              aria-label="Previous"
                            >
                              &laquo; PREV
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link
                              to="#"
                              className="page-link text-choco"
                              onClick={this.handleNextLink}
                            >
                              NEXT &raquo;
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    ) : (
                      <></>
                    )}
                  </div>
                  {role !== 1 ? (
                    <></>
                  ) : (
                    <div className="col-auto">
                      <button
                        onClick={() => {
                          navigate(`/products/create`);
                          window.scrollTo(0, 0);
                        }}
                        className="btn btn-dark"
                      >
                        CREATE PRODUCT
                      </button>
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

const mapStateToProps = (state) => {
  const {
    products: { products, favorite, price, totalPage, currentPage },
    auth: { authData },
  } = state;
  return {
    products,
    favorite,
    price,
    totalPage,
    currentPage,
    authData,
  };
};

export default connect(mapStateToProps)(
  withNavigate(withLocation(withSearchParams(withParams(Product))))
);
