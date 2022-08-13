import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

//assetss
import './styles.css'
import Default from "../../assets/img/default-product.jpg";

//component
import Footer from "../../components/Footer/Footer";
import ModalWarning from "../../components/ModalWarning/ModalWarning";
import Navbar from "../../components/Navbar/Navbar";

class CreatePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      normalPrice: 0,
      description: "",
      availableStart: "",
      availableEnd: "",
      image: "",
      coupon: "",
      discount: 0,
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
    const {
      productName,
      normalPrice,
      description,
      availableStart,
      availableEnd,
      image,
      discount,
      coupon,
    } = this.state;
    if (productName !== "") {
      body.append("productName", productName);
    }
    if (normalPrice !== 0) {
      body.append("normalPrice", Number(normalPrice));
    }
    if (description !== "") {
      body.append("description", description);
    }
    if (availableStart !== "") {
      body.append("availableStart", availableStart);
    }
    if (availableEnd !== "") {
      body.append("availableEnd", availableEnd);
    }
    if (image !== "") {
      body.append("image", image);
    }
    if (coupon !== "") {
      body.append("coupon", coupon);
    }
    if (discount !== 0) {
      body.append("discount", Number(discount));
    }
    return body;
  };

  createPromo = (event) => {
    event.preventDefault();
    const body = this.createForm();
    const URL = `${process.env.REACT_APP_HOST}/api/promos`;
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
      imgPreview,
      createSuccess,
      errorMsg,
      successMsg,
      availableStart,
      availableEnd,
      showModal,
      coupon,
    } = this.state;
    return (
      <>
        <Navbar />
        <div className="container create-container mb-5 mb-md-5">
          <form onSubmit={this.createPromo}>
            <div className="row link-products">
              {/* <Link to={<Product />}>Products</Link> */}
            </div>
            <div className="row justify-content-around mt-md-5">
              <div className="col-md-4">
                <div className="row justify-content-center">
                  <img
                    src={imgPreview ? imgPreview : Default}
                    alt="imageproduct"
                    className="rounded-circle border border-secondary cursor-image-products"
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
                <label className="fw-bold label mt-md-3">
                  Input discount :
                </label>
                <div className="start-time mt-md-3">
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder="input discount"
                    // value={start}
                    className="w-50 rounded-3 p-md-2 discount border-dark border border-1"
                    onChange={(event) => {
                      this.setState({
                        discount: event.target.value,
                      });
                    }}
                  />
                </div>
                <label className="fw-bold mt-md-3 label">Expired date :</label>
                <div className="start-time mt-md-3">
                  <input
                    type="date"
                    name="time-start"
                    id="time-start"
                    value={availableStart}
                    className="w-50 rounded-3 p-md-2 start-hour border-dark border border-1"
                    onChange={(event) => {
                      this.setState({
                        availableStart: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="end-time mt-2 mt-md-2">
                  <input
                    type="date"
                    name="time-end"
                    id="time-end"
                    className="w-50 rounded-3 p-md-2 end-hour border-dark border border-1"
                    value={availableEnd}
                    onChange={(event) => {
                      this.setState({
                        availableEnd: event.target.value,
                      });
                    }}
                  />
                </div>
                <label className="fw-bold label mt-md-3">
                  Input coupon code :
                </label>
                <div className="start-time mt-md-3">
                  <input
                    type="text"
                    name="coupon-code"
                    id="coupon-code"
                    placeholder="input coupon"
                    className="w-50 rounded-3 p-md-2 coupon-code border-dark border border-1"
                    value={coupon}
                    onChange={(event) => {
                      this.setState({
                        coupon: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="mb-3 mt-2 label fw-bold" htmlFor="name">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Type product name min. 50 characters"
                    onChange={(event) => {
                      this.setState({
                        productName: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="mb-3 mt-2 label fw-bold" htmlFor="name">
                    Normal Price :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Type the price"
                    onChange={(event) => {
                      this.setState({
                        normalPrice: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="mb-3 mt-2 label fw-bold" htmlFor="name">
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

export default connect(mapStateToProps)(CreatePromo);
