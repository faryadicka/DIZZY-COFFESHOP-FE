import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ModalWarning from "../../components/ModalWarning/ModalWarning";

//assets
import Default from "../../assets/img/default.png";
import "./NewProduct.scoped.css";

export class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      name: "",
      price: "",
      description: "",
      start: "",
      end: "",
      image: "",
      deliveryInfo: "",
      categoryId: "",
      errorMsg: "",
      successMsg: "",
      imgPreview: null,
      imgDefault: Default,
      createSuccess: false,
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
    const {
      name,
      price,
      description,
      start,
      end,
      deliveryInfo,
      image,
      categoryId,
    } = this.state;
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
    if (deliveryInfo !== "") {
      body.append("deliveryInfo", deliveryInfo);
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
    const token = this.state.token;
    axios
      .post(URL, body, {
        headers: {
          "x-access-token": token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({
          createSuccess: true,
          successMsg: res.data.message,
        });
      })
      .catch((err) => {
        this.setState({
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
    } = this.state;
    console.log(this.state);
    return (
      <>
        <Navbar />
        <form
          onSubmit={this.createProduct}
          className="container form-container-create"
        >
          <div className="row">
            <div className="col-auto">
              <Link to="/products">Products</Link>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-md-3 mt-4">
              <img
                src={imgPreview ? imgPreview : imgDefault}
                alt="imageproduct"
                className="rounded-circle border border-secondary cursor-image-products"
                onClick={(event) => {
                  this.inputFile.current.click();
                  event.preventDefault();
                }}
              />
              <input
                type="file"
                name="image"
                id="image"
                hidden
                ref={this.inputFile}
                onChange={this.handleUploadImage}
              />
              <div className="row mt-4">
                <button className="btn btn-choco py-3 rounded-4">
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
            </div>
            <div className="col-md-6">
              <div className="form-group mt-4">
                <label className="mb-3" htmlFor="name">
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
              <div className="form-group mt-4">
                <div className="row">
                  <label htmlFor="size">Input product size :</label> <br />
                  <small id="size-help" className="form-text text-muted">
                    Click size you want to use for this product
                  </small>
                </div>
                <div className="d-flex mt-3 gap-3">
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="reguler"
                    value="Reguler"
                  />
                  <label
                    htmlFor="reguler"
                    className="btn btn-outlined-order btn-warning rounded-circle"
                  >
                    R
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="large"
                    value="large"
                  />
                  <label
                    htmlFor="large"
                    className="btn btn-outlined-order  btn-warning rounded-circle"
                  >
                    L
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="extra-large"
                    value="extra-large"
                  />
                  <label
                    htmlFor="extra-large"
                    className="btn btn-outlined-order btn-warning rounded-circle"
                  >
                    XL
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="250-gr"
                    value="250-gr"
                  />
                  <label
                    htmlFor="250-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    250 gr
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="300-gr"
                    value="300-gr"
                  />
                  <label
                    htmlFor="300-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    300 gr
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="500-gr"
                    value="500-gr"
                  />
                  <label
                    htmlFor="500-gr"
                    className="btn btn-outlined-order btn-secondary rounded-circle"
                  >
                    500 gr
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row delivery justify-content-around mt-4">
            <div className="col-md-4">
              <div className="row">
                <label className="fw-bold">Delivery Hour :</label>
              </div>
              <div className="row mt-4">
                <div className="start-time">
                  <input
                    type="time"
                    name="time-start"
                    id="time-start"
                    value={start}
                    className="w-50 rounded-3 p-md-2 start-hour"
                    onChange={(event) => {
                      this.setState({
                        start: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="end-time mt-md-2">
                  <input
                    type="time"
                    name="time-end"
                    id="time-end"
                    className="w-50 rounded-3 p-md-2 end-hour"
                    value={end}
                    onChange={(event) => {
                      this.setState({
                        end: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="form-group">
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
                    id="reguler"
                    value={categoryId}
                    checked={categoryId === 1}
                    onChange={(event) => {
                      this.setState({
                        categoryId: event.target.value,
                      });
                    }}
                  />
                  <label
                    htmlFor="reguler"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Coffee
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="large"
                    value={categoryId}
                    checked={categoryId === 2}
                    onChange={(event) => {
                      this.setState({
                        categoryId: event.target.value,
                      });
                    }}
                  />
                  <label
                    htmlFor="large"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Non Coffee
                  </label>
                  <input
                    className="btn-check"
                    type="radio"
                    name="options-outlined"
                    id="extra-large"
                    value={categoryId}
                    checked={categoryId === 3}
                    onChange={(event) => {
                      this.setState({
                        categoryId: event.target.value,
                      });
                    }}
                  />
                  <label
                    htmlFor="extra-large"
                    className="btn btn-outlined-order btn-warning"
                  >
                    Foods
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-around mt-4">
            <div className="col-md-4">
              <div className="row">
                <label className="fw-bold">Input Stock :</label>
              </div>
              <div className="row input-stock">
                <div className="stock-input mt-md-2">
                  <input
                    type="number"
                    name="stock-input"
                    id="stock-input"
                    className="w-50 rounded-3 p-md-2 stock-input"
                    placeholder="Stock :"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="row">
                <button type="submit" className="btn btn-choco rounded-4 py-3">
                  Save Product
                </button>
              </div>
              <div className="row mt-3">
                <button className="btn btn-light rounded-4 py-3">Cancel</button>
              </div>
            </div>
          </div>
        </form>
        <ModalWarning
          showModal={createSuccess}
          message={createSuccess ? successMsg : errorMsg}
          hideModal={() => {
            this.setState({
              createSuccess: false,
            });
          }}
        />
        <Footer />
      </>
    );
  }
}

export default NewProduct;
