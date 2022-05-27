import React, { Component } from "react";

// Component
import Navbars from "../../components/Navbars/Navbars";
import Footer from "../../components/Footer/Footer";

// assets
import "../Profile/Profile.scoped.css";
import CardProfile from "../../components/CardProfile/CardProfile";
import ProfileImage from "../../assets/img/edit-profile.webp";
import Pencil from "../../assets/img/pancil-2.png";

export default class Profile extends Component {
  render() {
    return (
      <>
        <Navbars />
        <main className="main-user">
          <div className="main-content">
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-sm-4 text-white second-row-edit">
                  <div className="title-profile-user">
                    <h1 className="header-profile">USER PROFILE</h1>
                  </div>
                </div>
              </div>
              <div className="row first-row-edit justify-content-center">
                <CardProfile profile={ProfileImage} name="name" email="email" />
                <div className="col-10 col-lg-8">
                  <div className="card edit-column-first">
                    <div className="card-body">
                      <div className="contacts-logo-edit">
                        <div className="header-3">
                          <h3>Contacs</h3>
                        </div>
                        <div className="edit-logo">
                          <button className="btn-edit-logo">
                            <div className="logo-circle-second text-center rounded-circle">
                              <img
                                src={Pencil}
                                alt="edit"
                                className="edit-pencil-input"
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 mb-lg-5 mt-lg-5">
                            <label for="email" className="form-label">
                              Email address :
                            </label>
                            <br />
                            <input
                              type="email"
                              className="form-control-profile"
                              id="email"
                              placeholder="your email"
                            />
                          </div>
                          <div className="mb-lg-5">
                            <label for="address" className="form-label">
                              Delivery address :
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control-profile"
                              id="address"
                              placeholder="your address"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-3 mt-lg-5">
                            <label for="phone" className="form-label">
                              Phone number :
                            </label>
                            <br />
                            <input
                              type="number"
                              className="form-control-profile"
                              id="phone"
                              placeholder="your phone number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between second-row-edit">
                <div className="col-6 col-lg-8">
                  <div className="card edit-column-first">
                    <div className="card-body">
                      <div className="contacts-logo-edit">
                        <div className="header-3">
                          <h3>Details</h3>
                        </div>
                        <div className="edit-logo">
                          <button className="btn-edit-logo">
                            <div className="logo-circle-second text-center rounded-circle">
                              <img
                                src={Pencil}
                                alt="edit"
                                className="edit-pencil-input"
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="mb-lg-5 mb-2">
                            <label for="display-name" className="form-label">
                              Display name :
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control-profile"
                              id="display-name"
                              placeholder="your display name"
                            />
                          </div>
                          <div className="mb-lg-5 mb-2">
                            <label for="first-name" className="form-label">
                              First name :
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control-profile"
                              id="first-name"
                              placeholder="your first name"
                            />
                          </div>
                          <div className="mb-lg-5 mb-2">
                            <label for="last-name" className="form-label">
                              Last name :
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control-profile"
                              id="last-name"
                              placeholder="your last name"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4 mb-lg-5 mb-2">
                          <div className="mb-lg-5 mb-2">
                            <label for="birthdate" className="form-label">
                              DD/MM/YY :
                            </label>
                            <input
                              type="datetime"
                              className="form-control-profile"
                              id="birthdate"
                              placeholder="DD/MM/YY"
                            />
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check mt-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4">
                  <p className="question-edit fw-bold text-white text-center">
                    Do you want to save the <br /> changes?
                  </p>
                  <form className="form-input-profile d-flex flex-column gap-3">
                    <button type="button" className="btn-footer btn-choco">
                      Save Changes
                    </button>
                    <button type="button" className="btn-footer btn-yellow">
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-footer btn-light text-start"
                    >
                      Edit Password
                    </button>
                    <button
                      type="button"
                      className="btn-footer btn-light text-start"
                    >
                      Logout
                    </button>
                  </form>
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
