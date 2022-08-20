import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

//assets
import "./CreateProduct.scooped.css";
import Default from "../../assets/img/default-product.jpg";

//component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../Products/Products";
import ModalWarning from "../../components/ModalWarning/ModalWarning";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: "",
      start: "",
      end: "",
      image: "",
      categoryId: "",
      errorMsg: "",
      successMsg: "",
      imgPreview: null,
      imgDefault: Default,
      createSuccess: false,
      showModal: false,
    };
    this.inputFile = React.createRef();
  }

  handleUploadImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(
          {
            imgPreview: reader.result,
            image: file,
          },
          () => {
            console.log(this.state.image);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  createForm = () => {
    let body = new FormData();
    const { name, price, description, start, end, image, categoryId } =
      this.state;
    if (name !== "") {
      body.append("name", name);
    }
    if (price !== "") {
      body.append("price", Number(price));
    }
    if (description !== "") {
      body.append("description", description);
    }
    if (start !== "") {
      body.append("start", start);
    }
    if (end !== "") {
      body.append("end", end);
    }
    if (image !== "") {
      body.append("image", image);
    }
    if (categoryId !== "") {
      body.append("categoryId", Number(categoryId));
    }
    return body;
  };

  createProduct = (event) => {
    event.preventDefault();
    const body = this.createForm();
    const URL = `${process.env.REACT_APP_HOST}/api/products`;
    const { token } = this.props;
    axios
      .post(URL, body, {
        headers: {
          "x-access-token": token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({
          showModal: true,
          createSuccess: true,
          successMsg: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          showModal: true,
          errorMsg: err.response.data.message,
        });
      });
  };

  render() {
    const {
      categoryId,
      imgDefault,
      imgPreview,
      createSuccess,
      errorMsg,
      successMsg,
      start,
      end,
      showModal,
    } = this.state;
    return (
      <>
        <Navbar />
        <div className="container create-container mb-5 mb-md-5">
          <form onSubmit={this.createProduct}>
            <div className="row link-products">
              <Link to={<Products />}>Products</Link>
            </div>
            <div className="row justify-content-around mt-md-5">
              <div className="col-md-4">
                <div className="row justify-content-center">
                  <img
                    src={imgPreview ? imgPreview : imgDefault}
                    alt="imageproduct"
                    className="rounded-circle cursor-image-products"
                    onClick={(event) => {
                      this.inputFile.current.click();
                      event.preventDefault();
                    }}
                  />
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  hidden
                  ref={this.inputFile}
                  onChange={this.handleUploadImage}
                />
                <div className="row mt-4">
                  <button className="btn btn-dark py-3 rounded-4">
                    Take a picture
                  </button>
                </div>
                <div className="row mt-2">
                  <button
                    onClick={(event) => {
                      this.inputFile.current.click();
                      event.preventDefault();
                    }}
                    className="btn btn-warning py-3 rounded-4"
                  >
                    Choose from gallery
                  </button>
                </div>
                <label className="fw-bold label">Delivery Hour :</label>
                <div className="start-time mt-md-3">
                  <input
                    type="time"
                    name="time-start"
                    id="time-start"
                    // value={start}
                    className="w-50 rounded-3 p-md-2 start-hour border-dark border border-1"
                    onChange={(event) => {
                      this.setState({
                        start: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="end-time mt-2 mt-md-2">
                  <input
                    type="time"
                    name="time-end"
                    id="time-end"
                    className="w-50 rounded-3 p-md-2 end-hour border-dark border border-1"
                    value={end}
                    onChange={(event) => {
                      this.setState({
                        end: event.target.value,
                      });
                    }}
                  />
                </div>
                <label className="fw-bold label mt-md-3">Input stock :</label>
                <div className="start-time mt-md-3">
                  <input
                    type="number"
                    name="stock-input"
                    id="stock-input"
                    placeholder="input stock"
                    value={start}
                    className="w-50 rounded-3 p-md-2 stock-input border-dark border border-1"
                    // onChange={(event) => {
                    //   this.setState({
                    //     stock: event.target.value,
                    //   });
                    // }}
                  />
                </div>
                <div className="row mt-5 mt-md-5">
                  <button
                    type="submit"
                    className="btn btn-choco rounded-4 py-3"
                  >
                    Save Product
                  </button>
                </div>
                <div className="row mt-3">
                  <button className="btn btn-light rounded-4 py-3">
                    Cancel
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="mb-3 label" htmlFor="name">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Type product name min. 50 characters"
                    onChange={(event) => {
                      this.setState({
                        name: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="mb-3" htmlFor="name">
                    Price :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Type the price"
                    onChange={(event) => {
                      this.setState({
                        price: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="mb-3" htmlFor="name">
                    Description :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Type product name min. 150 characters"
                    onChange={(event) => {
                      this.setState({
                        description: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-md-3">
                  <div className="row">
                    <label htmlFor="size">Input Category :</label> <br />
                    <small id="size-help" className="form-text text-muted">
                      Click category you want to use for this product
                    </small>
                  </div>
                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="coffe"
                      value={categoryId}
                      checked={categoryId === "1"}
                      onChange={(event) => {
                        this.setState({
                          categoryId: "1",
                        });
                      }}
                    />
                    <label
                      htmlFor="coffe"
                      className="btn btn-outlined-order btn-warning"
                    >
                      Coffee
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="non-coffe"
                      value={categoryId}
                      checked={categoryId === "2"}
                      onChange={(event) => {
                        this.setState({
                          categoryId: "2",
                        });
                      }}
                    />
                    <label
                      htmlFor="non-coffe"
                      className="btn btn-outlined-order btn-warning"
                    >
                      Non Coffee
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="foods"
                      value={categoryId}
                      checked={categoryId === "3"}
                      onChange={(event) => {
                        this.setState({
                          categoryId: "3",
                        });
                      }}
                    />
                    <label
                      htmlFor="foods"
                      className="btn btn-outlined-order btn-warning"
                    >
                      Foods
                    </label>
                  </div>
                </div>
                <div className="form-group mt-3 mt-md-3">
                  <div className="row">
                    <label htmlFor="size">Input product size :</label> <br />
                    <small id="size-help" className="form-text text-muted">
                      Click size you want to use for this product
                    </small>
                  </div>
                  <div className="d-flex gap-3 mt-3">
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="R"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "1",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="R"
                      className="btn btn-outlined-order btn-create"
                    >
                      R
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="L"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "2",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="L"
                      className="btn btn-outlined-order btn-create"
                    >
                      L
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="XL"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "3",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="XL"
                      className="btn btn-outlined-order btn-create"
                    >
                      XL
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="250"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "4",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="250"
                      className="btn btn-outlined-order font-size-gram"
                    >
                      250 <br />
                      gr
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="300"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "5",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="300"
                      className="btn btn-outlined-order font-size-gram"
                    >
                      300 <br />
                      gr
                    </label>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-outlined"
                      id="500"
                      // onChange={(event) => {
                      //   this.setState({
                      //     sizeId: "6",
                      //   });
                      // }}
                    />
                    <label
                      htmlFor="500"
                      className="btn btn-outlined-order font-size-gram"
                    >
                      500 <br />
                      gr
                    </label>
                  </div>
                  <div className="form-group mt-3 mt-md-3">
                    <div className="row">
                      <label htmlFor="size">Input delivery methods :</label>{" "}
                      <br />
                      <small id="size-help" className="form-text text-muted">
                        Click delivery methods you want to use for this product
                      </small>
                    </div>
                    <div className="d-flex gap-3 mt-3">
                      <input
                        className="btn-check"
                        type="radio"
                        name="options-outlined"
                        id="coffe"
                        // onChange={(event) => {
                        //   this.setState({
                        //     deliveryId: "1",
                        //   });
                        // }}
                      />
                      <label
                        htmlFor="coffe"
                        className="btn btn-outlined-order btn-warning"
                      >
                        Home Delivery
                      </label>
                      <input
                        className="btn-check"
                        type="radio"
                        name="options-outlined"
                        id="non-coffe"
                        // onChange={(event) => {
                        //   this.setState({
                        //     deliveryId: "2",
                        //   });
                        // }}
                      />
                      <label
                        htmlFor="non-coffe"
                        className="btn btn-outlined-order btn-warning"
                      >
                        Dine In
                      </label>
                      <input
                        className="btn-check"
                        type="radio"
                        name="options-outlined"
                        id="foods"
                        // onChange={(event) => {
                        //   this.setState({
                        //     deliveryId: "3",
                        //   });
                        // }}
                      />
                      <label
                        htmlFor="foods"
                        className="btn btn-outlined-order btn-warning"
                      >
                        Take Away
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ModalWarning
          showModal={showModal}
          message={createSuccess ? successMsg : errorMsg}
          hideModal={() => {
            this.setState({
              showModal: false,
            });
          }}
        />
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

export default connect(mapStateToProps)(CreateProduct);
