import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardProduct from "../../components/CardProducts/CardProduct";
import NavbarHome from "../../components/NavbarHome/Navbar";
import Loading from "../../components/Loading/Loading";
// assets
import "../Products/Products.scoped.css";
import MothersDay from "../../assets/img/ava-coupon-3.png";
import SundayMorning from "../../assets/img/ava-coupon-2.png";
import HalloweenDay from "../../assets/img/ava-coupon-1.png";
//Axios
import { getFixProducts, getFavorite } from "../../services/product";

function Products() {
  const dataLogin = useSelector((state) => state.auth.authData);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState(false);
  const [loading, setLoading] = useState(false);

  const paramsCategory = searchParams.get("category") || "";
  const paramsName = searchParams.get("name") || "";
  const paramsSort = searchParams.get("sort") || "name";
  const paramsOrder = searchParams.get("order") || "asc";
  const paramsPage = searchParams.get("page") || "1";

  const getAllproducts = (category, search, sort, order, page) => {
    setLoading(true);
    getFixProducts(category, search, sort, order, page)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
        setMeta(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFavoriteProducts = () => {
    setLoading(false);
    getFavorite()
      .then((res) => {
        setFavorites(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  useEffect(() => {
    getAllproducts(
      paramsCategory,
      paramsName,
      paramsSort,
      paramsOrder,
      paramsPage
    );
  }, [
    searchParams,
    paramsCategory,
    paramsName,
    paramsOrder,
    paramsSort,
    paramsPage,
  ]);
  return (
    <>
      {dataLogin?.token ? (
        <Navbar
          category={paramsCategory}
          name={paramsName}
          sort={paramsOrder}
          order={paramsOrder}
          page={paramsPage}
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
                    Get a cup of coffee for free on sunday morning Only at 7 to
                    9 AM
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
                    HAPPY HALLOWEEN! Do you like chicken wings? Get 1 free only
                    if you buy pinky promise
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
              {dataLogin?.role !== 1 ? (
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
              {params.favorite !== "favorite" ? (
                <div className="d-flex  flex-row-reverse gap-3">
                  <div className="sort-option">
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {!sort
                          ? "Sort by"
                          : paramsSort === "price"
                          ? "Price"
                          : paramsSort === "name"
                          ? "Name"
                          : null}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setSort(true);
                            !searchParams.get("category")
                              ? navigate(
                                  `/products?sort=name&order=${paramsOrder}&page=1`
                                )
                              : navigate(
                                  `/products?category=${searchParams.get(
                                    "category"
                                  )}&sort=name&order=${
                                    searchParams.get("order") || "asc"
                                  }&page=1`
                                );
                          }}
                        >
                          Name
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setSort(true);
                            !searchParams.get("category")
                              ? navigate(
                                  `/products?sort=price&order=${paramsOrder}&page=1`
                                )
                              : navigate(
                                  `/products?category=${searchParams.get(
                                    "category"
                                  )}&sort=price&order=${searchParams.get(
                                    "order"
                                  )}&page=1`
                                );
                          }}
                        >
                          Price
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="sort-option">
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {!order
                          ? "Order"
                          : paramsOrder === "asc"
                          ? "Asc"
                          : paramsOrder === "desc"
                          ? "Desc"
                          : null}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setOrder(true);
                            !searchParams.get("category")
                              ? navigate(
                                  `/products?sort=${paramsSort}&order=asc&page=1`
                                )
                              : navigate(
                                  `/products?category=${searchParams.get(
                                    "category"
                                  )}&sort=${searchParams.get(
                                    "sort"
                                  )}&order=asc&page=1`
                                );
                          }}
                        >
                          Asc
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setOrder(true);
                            !searchParams.get("category")
                              ? navigate(
                                  `/products?sort=${paramsSort}&order=desc&page=1`
                                )
                              : navigate(
                                  `/products?category=${searchParams.get(
                                    "category"
                                  )}&sort=${searchParams.get(
                                    "sort"
                                  )}&order=desc&page=1`
                                );
                          }}
                        >
                          Desc
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              ) : null}
              <ul className="row text-center mt-3 justify-content-between wrapper-menu-category">
                <li className="col-3 col-lg-3 link-category">
                  <div
                    onClick={() => {
                      setSort(false);
                      setOrder(false);
                      navigate("/products/favorite");
                    }}
                    className={`${
                      params.favorite === "favorite"
                        ? "menu-products-active"
                        : "menu-products"
                    }`}
                  >
                    Favorite & Promo
                  </div>
                </li>
                <li className="col-2 col-lg-2 link-category">
                  <div
                    onClick={() => {
                      setSort(false);
                      setOrder(false);
                      navigate(
                        `/products?category=1&sort=name&order=asc&page=1`
                      );
                    }}
                    className={`${
                      searchParams.get("category") === "1"
                        ? "menu-products-active"
                        : "menu-products"
                    }`}
                  >
                    Coffee
                  </div>
                </li>
                <li className="col-2 col-lg-2 link-category">
                  <div
                    onClick={() => {
                      setSort(false);
                      setOrder(false);
                      navigate(
                        `/products?category=2&sort=name&order=asc&page=1`
                      );
                    }}
                    className={`${
                      searchParams.get("category") === "2"
                        ? "menu-products-active"
                        : "menu-products"
                    }`}
                  >
                    Non Coffee
                  </div>
                </li>
                <li className="col-2 col-lg-2 link-category">
                  <div
                    onClick={() => {
                      setSort(false);
                      setOrder(false);
                      navigate(
                        `/products?category=3&sort=name&order=asc&page=1`
                      );
                    }}
                    className={`${
                      searchParams.get("category") === "3"
                        ? "menu-products-active"
                        : "menu-products"
                    }`}
                  >
                    Foods
                  </div>
                </li>
                <li className="col-2 col-lg-2 link-category">
                  <div
                    onClick={() => {
                      setSort(false);
                      setOrder(false);
                      navigate("/products");
                    }}
                    className={`${
                      searchParams.get("category") === null &&
                      params.favorite !== "favorite"
                        ? "menu-products-active"
                        : "menu-products"
                    }`}
                  >
                    All
                  </div>
                </li>
              </ul>
              <div className="row mt-5 justify-content-center row-products">
                {products.length > 0 && favorites.length > 0 ? (
                  <>
                    {params.favorite === "favorite"
                      ? favorites.map((item) => (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={isShowBtn}
                          />
                        ))
                      : products.map((item) => (
                          <CardProduct
                            id={item.id}
                            image={`${item.image}`}
                            discount="0%"
                            title={item.name}
                            price={`IDR ${item.price}`}
                            key={item.id}
                            show={isShowBtn}
                          />
                        ))}
                  </>
                ) : loading ? (
                  <div className="d-flex justify-content-center m-5">
                    <Loading />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <h1 className="text-warning">PRODUCT NOT FOUND</h1>
                  </div>
                )}
              </div>
              <div className="row pagination justify-content-center">
                {dataLogin?.role !== 1 ? (
                  <></>
                ) : (
                  <div className="col-auto">
                    <button
                      onClick={() => {
                        setIsShowBtn(!isShowBtn);
                      }}
                      className="btn btn-dark"
                    >
                      EDIT PRODUCT
                    </button>
                  </div>
                )}
                <div className="col-auto">
                  {meta?.totalPage > 1 && params.favorite !== "favorite" ? (
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          {meta.prevLink ? (
                            <div
                              onClick={() => {
                                navigate(
                                  `/products?sort=${paramsSort}&order=${paramsOrder}&page=${
                                    meta.currentPage - 1
                                  }`
                                );
                                window.scrollTo({
                                  top: 100,
                                  left: 100,
                                  behavior: "smooth",
                                });
                              }}
                              className="page-link text-choco"
                              aria-label="Previous"
                            >
                              &laquo; PREV
                            </div>
                          ) : null}
                        </li>
                        <li>
                          <div className="page-link text-choco">
                            {meta.currentPage}
                          </div>
                        </li>
                        <li className="page-item">
                          {meta.nextLink ? (
                            <div
                              className="page-link text-choco"
                              onClick={() => {
                                navigate(
                                  `/products?sort=${paramsSort}&order=${paramsOrder}&page=${
                                    meta.currentPage + 1
                                  }`
                                );
                                window.scrollTo({
                                  top: 100,
                                  left: 100,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              NEXT &raquo;
                            </div>
                          ) : null}
                        </li>
                      </ul>
                    </nav>
                  ) : (
                    <></>
                  )}
                </div>
                {dataLogin.role !== 1 ? (
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

export default Products;
