import React, { Component } from "react";
import axios from "axios";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// assets
import "../Profile/Profile.scoped.css";
import CardProfile from "../../components/CardProfile/CardProfile";
import ProfileImage from "../../assets/img/edit-profile.webp";
import Pencil from "../../assets/img/pancil-2.png";

// import { getProfile } from "../../services/profile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("sign-payload"),
      isLogin: true,
      display: "",
      image: "",
      address: "",
      phone: "",
      birthdate: "",
      gender: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  getProfilePage = () => {
    const URL = "http://localhost:5000/api/users/profile";
    const token = this.state.token;
    return axios
      .get(URL, { headers: { "x-access-token": token } })
      .then((res) => {
        console.log(res.data.total);
        this.setState({
          display: res.data.total.display_name,
          image: res.data.total.image_profile,
          address: res.data.total.address,
          phone: res.data.total.phone,
          birthdate: res.data.total.birthdate,
          gender: res.data.total.gender,
          firstName: res.data.total.first_name,
          lastName: res.data.total.last_name,
          email: res.data.total.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateProfilePage = () => {
    const {
      display,
      image,
      address,
      phone,
      birthdate,
      gender,
      firstName,
      lastName,
      email,
    } = this.state;
    const body = {
      display,
      image,
      address,
      phone,
      birthdate,
      gender,
      firstName,
      lastName,
      email,
    };
    const URL = "http://localhost:5000/api/users";
    const token = this.state.token;
    return axios
      .patch(URL, body, { headers: { "x-access-token": token } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getProfilePage();
    this.updateProfilePage();
  }

  render() {
    if (!this.state.token)
      return this.setState({
        isLogin: false,
      });
    return (
      <>
        <Navbar />
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
                <CardProfile
                  profile={this.state.image}
                  name={this.state.display}
                  email={this.state.email}
                />
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
                              placeholder={this.state.email}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  email: event.target.value,
                                });
                              }}
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
                              placeholder={this.state.address}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  address: event.target.value,
                                });
                              }}
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
                              type="text"
                              className="form-control-profile"
                              id="phone"
                              placeholder={this.state.phone}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  phone: event.target.value,
                                });
                              }}
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
                              placeholder={this.state.display}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  display: event.target.value,
                                });
                              }}
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
                              placeholder={this.state.firstName}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  firstName: event.target.value,
                                });
                              }}
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
                              placeholder={this.state.lastName}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  lastName: event.target.value,
                                });
                              }}
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
                              placeholder={this.state.birthdate}
                              onChange={(event) => {
                                event.preventDefault();
                                this.setState({
                                  birthdate: event.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value="male"
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
                              value="female"
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
                  <div className="form-input-profile d-flex flex-column gap-3">
                    <button
                      type="button"
                      className="btn-footer btn-choco"
                      onClick={this.updateProfilePage}
                    >
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
                  </div>
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

export default Profile;
