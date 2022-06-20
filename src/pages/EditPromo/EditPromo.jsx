import React, { Component } from "react";

//assetss
import "./EditPromo.scooped.css";
import Default from "../../assets/img/default.png";
import Line from "../../assets/img/Line 49.png";
// import Pencil from "../../assets/img/pancil-2.png";

//component
import Footer from "../../components/Footer/Footer";
import ModalWarning from "../../components/ModalWarning/ModalWarning";
import Navbar from "../../components/Navbar/Navbar";
import withParams from "../../helpers/withParams";
import { editPromoAxios, getPromoByIdAxios } from "../../services/promo";

class EditPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
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

  getPromoById = (id, token) => {
    getPromoByIdAxios(id, token)
      .then((res) => {
        console.log(res);
        this.setState({
          productName: res.data.total.products_name,
          normalPrice: res.data.total.normal_price,
          description: res.data.total.description,
          availableEnd: res.data.total.available_end,
          availableStart: res.data.total.available_start,
          coupon: res.data.total.coupon,
          discount: res.data.total.discount,
          image: res.data.total.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  updateForm = () => {
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

  updatePromo = (event) => {
    event.preventDefault();
    const body = this.updateForm();
    const token = this.state.token;
    const { id } = this.props.params;
    editPromoAxios(id, token, body)
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

  componentDidMount = () => {
    const { id } = this.props.params;
    const { token } = this.state;
    console.log(id);
    this.getPromoById(id, token);
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
      discount,
      normalPrice,
      productName,
      description,
      image,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <>
          <Navbar />
          <div className="container create-container mb-5 mb-md-5">
            <form onSubmit={this.updatePromo}>
              <div className="row link-products">
                {/* <Link to={<Product />}>Products</Link> */}
              </div>
              <div className="row justify-content-around mt-md-5">
                <div className="col-md-4">
                  <div className="row justify-content-center">
                    <div className="card card-promo-edit text-center">
                      <div className="upload-wrap">
                        <img
                          src={imgPreview ? imgPreview : image}
                          class="rounded-circle cursor-image-products w-50 card-img-center"
                          alt="imagepromo"
                        />
                        <input
                          type="file"
                          name="image"
                          id="image"
                          hidden
                          ref={this.inputFile}
                          onChange={this.handleUploadImage}
                        />
                        <button
                          onClick={(event) => {
                            this.inputFile.current.click();
                            event.preventDefault();
                          }}
                          className="btn button-edit-promo rounded-circle"
                        >
                          EDIT
                        </button>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{productName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted fw-bold">
                          {`${discount}% OFF`}
                        </h6>
                        <p className="card-text">{description}</p>
                        <img className="line-promo" src={Line} alt="line" />
                        <p className="card-text">COUPON CODE</p>
                        <p className="card-text fw-bold">{coupon}</p>
                        <p className="card-text">Valid until {availableEnd}</p>
                      </div>
                    </div>
                  </div>
                  <label className="fw-bold mt-md-5 label">
                    Expired date :
                  </label>
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
                      placeholder="input stock"
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
                      value={productName}
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
                      value={normalPrice}
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
                      value={description}
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
                          Click delivery methods you want to use for this
                          product
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
                    <label className="fw-bold label mt-md-3">
                      Input discount :
                    </label>
                    <div className="start-time mt-md-3">
                      <input
                        type="text"
                        name="discount"
                        id="discount"
                        placeholder="input discount"
                        value={discount}
                        className="w-50 rounded-3 p-md-2 discount border-dark border border-1"
                        onChange={(event) => {
                          this.setState({
                            discount: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="row mt-5 mt-md-5">
                      <button
                        type="submit"
                        className="btn btn-choco rounded-4 py-3"
                      >
                        Save Promo
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
      </>
    );
  }
}

export default withParams(EditPromo);
