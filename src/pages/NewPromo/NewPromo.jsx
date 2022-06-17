import React, { Component } from "react";
import { Link } from "react-router-dom";

// assets
// import "./NewPromo.scoped.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/ModalWarning/ModalWarning";
import Default from "../../assets/img/default.png";

class NewPromo extends Component {
  render() {
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
            <div className="col-md-4 mt-4">
              <img
                src={Default}
                alt="imageproduct"
                className="rounded-circle border border-secondary cursor-image-products ms-5"
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
              <div className="row mt-3">
                <button type="submit" className="btn btn-choco rounded-4 py-3">
                  Save Promo
                </button>
              </div>
              <div className="row mt-3">
                <button className="btn btn-light rounded-4 py-3">Cancel</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-4">
                <label className="mb-2 text-danger fw-bold" htmlFor="name">
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
                <label className="mb-2 text-danger fw-bold" htmlFor="name">
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
                <label className="mb-2 text-danger fw-bold" htmlFor="name">
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
              <div className="d-flex justify-content-around">
                <div className="coupon-discount">
                  <div className="row mt-3">
                    <label className="fw-bold  text-danger">
                      Enter the discount :
                    </label>
                  </div>
                  <div className="row mt-3">
                    <div className="discount">
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        // value={start}
                        placeholder="Input the discount"
                        className="w-50 rounded-3 p-md-2 start-hour w-100"
                        onChange={(event) => {
                          this.setState({
                            discount: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <label className="fw-bold text-danger">
                      Input coupon code :
                    </label>
                  </div>
                  <div className="row mt-2">
                    <div className="start-time">
                      <input
                        type="text"
                        name="code"
                        id="code"
                        // value={start}
                        className="w-50 rounded-3 p-md-2 start-hour w-100"
                        onChange={(event) => {
                          this.setState({
                            code: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="date ms-5">
                  <div className="row mt-3">
                    <label className="fw-bold text-danger">
                      Expired date :
                    </label>
                  </div>
                  <div className="row mt-3">
                    <div className="start-time">
                      <input
                        type="date"
                        name="date-start"
                        id="date-start"
                        // value={start}
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
                        type="date"
                        name="date-end"
                        id="date-end"
                        className="w-50 rounded-3 p-md-2 end-hour"
                        // value={end}
                        onChange={(event) => {
                          this.setState({
                            end: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Modal
          // showModal={createSuccess}
          // message={createSuccess ? successMsg : errorMsg}
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

export default NewPromo;
