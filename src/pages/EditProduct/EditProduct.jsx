import React, { Component } from "react";
import { Link } from "react-router-dom";

//components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/ModalWarning/ModalWarning";

//HOC
import { connect } from "react-redux";
import withParams from "../../helpers/withParams";

//axios
import { editProductAxios, getProductDetail } from "../../services/product";
//redux
// import {
//   getProductDetailRedux,
//   editProductRedux,
// } from "../../redux/actionCreator/product";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      image: "",
      description: "",
      successMsg: "",
      errorMsg: "",
      useSrc: true,
      imgPreview: null,
      updateSuccess: false,
      token: localStorage.getItem("token"),
    };
    this.inputFile = React.createRef();
  }

  getProductDetailPage = (id) => {
    getProductDetail(id)
      .then((res) => {
        console.log(res);
        this.setState({
          name: res.data.data.name,
          price: res.data.data.price,
          image: res.data.data.image,
          description: res.data.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      this.setState(data);
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(
          { imgPreview: reader.result, useSrc: false, image: file },
          () => {
            console.log(this.state.image);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  editForm = () => {
    let body = new FormData();
    const { name, price, image, description } = this.state;
    if (name !== "") {
      body.append("name", name);
    }
    if (price !== 0) {
      body.append("price", price);
    }
    if (image !== "") {
      body.append("image", image);
    }
    if (description !== "") {
      body.append("description", description);
    }
    return body;
  };

  editProduct = (event) => {
    event.preventDefault();
    const body = this.editForm();
    const {
      params: { id },
    } = this.props;
    const { token } = this.state;
    editProductAxios(id, body, token)
      .then((res) => {
        console.log(res.data);
        this.setState({
          updateSuccess: true,
          successMsg: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMsg: err.response.data.message,
        });
      });
  };

  componentDidMount() {
    const {
      params: { id },
    } = this.props;
    this.getProductDetailPage(id);
  }
  render() {
    const {
      name,
      price,
      image,
      description,
      updateSuccess,
      errorMsg,
      successMsg,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <Navbar />
        <main>
          <div className="container">
            <form
              onSubmit={this.editProduct}
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
                    src={`${process.env.REACT_APP_HOST}${image}`}
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
                    onChange={this.handleChangeFile}
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
                      value={name}
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
                      value={price}
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
                      value={description}
                      onChange={(event) => {
                        this.setState({
                          description: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group mt-4">
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
                          id="coffe"
                          value=""
                          checked=""
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
                          value=""
                          checked=""
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
                          value=""
                          checked=""
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
                  </div>
                </div>
              </div>
              <div className="row delivery justify-content-evenly mt-4">
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
                        value=""
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
                        value=""
                        onChange={(event) => {
                          this.setState({
                            end: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-5 p-0 mt-3 mt-md-0">
                  <div className="row p-3 p-md-0">
                    <button
                      type="submit"
                      className="btn btn-choco rounded-4 py-3"
                    >
                      Save Product
                    </button>
                  </div>
                  <div className="row p-3 p-md-0">
                    <button className="btn btn-light rounded-4 py-3">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
        <Modal
          showModal={updateSuccess}
          message={updateSuccess ? successMsg : errorMsg}
          hideModal={() => {
            this.setState({
              updateSuccess: false,
            });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    products: { detail },
  } = state;
  return {
    detail,
  };
};

export default connect(mapStateToProps)(withParams(EditProduct));
