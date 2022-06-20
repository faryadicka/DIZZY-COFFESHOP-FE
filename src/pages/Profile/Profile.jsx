import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ModalWarning from "../../components/ModalWarning/ModalWarning";

// assets
import "../Profile/Profile.scoped.css";
// import CardProfile from "../../components/CardProfile/CardProfile";
// import ProfileImage from "../../assets/img/edit-profile.webp";
import Pencil from "../../assets/img/pancil-2.png";
import Avatar from "../../assets/img/avatar.png";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      display: "",
      address: "",
      phone: "",
      birthdate: "",
      gender: "female",
      firstName: "",
      lastName: "",
      email: "",
      image: "",
      imgPreview: null,
      imgDefault: Avatar,
      useSrc: true,
      successMsg: "",
      errorMsg: "",
      updateSuccess: false,
    };
    this.inputFile = React.createRef();
  }
  getProfilePage = () => {
    const URL = `${process.env.REACT_APP_HOST}/api/users/profile`;
    const token = this.state.token;
    axios
      .get(URL, { headers: { "x-access-token": token } })
      .then((res) => {
        console.log(res);
        this.setState({
          email: res.data.data.email,
          display: res.data.data.display_name,
          address: res.data.data.address,
          phone: res.data.data.phone,
          birthdate: res.data.data.birthdate,
          gender: res.data.data.gender,
          firstName: res.data.data.first_name,
          lastName: res.data.data.last_name,
          image: res.data.data.image_profile,
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
    // console.log(file.name);
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

  updateForm = () => {
    let body = new FormData();
    if (this.state.image !== "") {
      body.append("image", this.state.image);
    }
    if (this.state.display !== "") {
      body.append("display", this.state.display);
    }
    if (this.state.address !== "") {
      body.append("address", this.state.address);
    }
    if (this.state.birthdate !== "") {
      body.append("birthdate", this.state.birthdate);
    }
    if (this.state.firstName !== "") {
      body.append("firstName", this.state.firstName);
    }
    if (this.state.lastName !== "") {
      body.append("lastName", this.state.lastName);
    }
    if (this.state.gender !== "") {
      body.append("gender", this.state.gender);
    }
    if (this.state.phone !== "") {
      body.append("phone", this.state.phone);
    }
    return body;
  };

  udpdateProfile = (event) => {
    event.preventDefault();
    const body = this.updateForm();
    console.log(body);
    const URL = `${process.env.REACT_APP_HOST}/api/users/profile`;
    const token = this.state.token;
    axios
      .patch(URL, body, {
        headers: {
          "x-access-token": token,
          "content-type": "multipart/form-data",
        },
      })
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
    this.getProfilePage();
  }

  render() {
    if (!this.state.token)
      return this.setState({
        isLogin: false,
      });

    const {
      imgPreview,
      image,
      email,
      errorMsg,
      successMsg,
      updateSuccess,
      display,
      display_name,
      address,
      phone,
      firstName,
      lastName,
      birthdate,
      gender,
    } = this.state;
    // const profile = image !== null ? image : imgPreview;
    return (
      <>
        <Navbar />
        <main className="main-user mt-5">
          <div className="main-content">
            <form
              className="container form-input-profile"
              onSubmit={this.udpdateProfile}
            >
              <div className="row">
                <div className="col-md-4 col-sm-4 text-white second-row-edit">
                  <div className="title-profile-user">
                    <h1 className="header-profile">USER PROFILE</h1>
                  </div>
                </div>
              </div>
              <div className="row first-row-edit justify-content-center">
                <div className="col-10 col-lg-4">
                  <div className="card pt-3 text-center align-items-center edit-column-first">
                    <img
                      src={
                        imgPreview
                          ? imgPreview
                          : `${process.env.REACT_APP_HOST}${image}`
                      }
                      className="card-img-top rounded-circle"
                      alt="profile"
                    />
                    <input
                      value=""
                      type="file"
                      name="image"
                      ref={this.inputFile}
                      id="image"
                      hidden
                      onChange={this.handleChangeFile}
                    />
                    <button
                      className="btn-edit-logo"
                      onClick={(event) => {
                        this.inputFile.current.click();
                        event.preventDefault();
                      }}
                    >
                      <div className="logo-circle-first rounded-circle">
                        <img
                          src={Pencil}
                          alt="edit"
                          className="edit-pencil-ava"
                        />
                      </div>
                    </button>{" "}
                    <div className="card-body">
                      <h5 className="display-name fw-bold">{display_name}</h5>
                      <p className="email-profile">{email}</p>
                      <p className="delivery-info mt-4">
                        Has been ordered 15 products
                      </p>
                    </div>
                  </div>
                </div>
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
                            <label htmlFor="email" className="form-label">
                              Email address :
                            </label>
                            <br />
                            <input
                              value={email}
                              name="email"
                              type="email"
                              className="form-control-profile"
                              id="email"
                              // placeholder={email}
                            />
                          </div>
                          <div className="mb-lg-5">
                            <label htmlFor="address" className="form-label">
                              Delivery address :
                            </label>
                            <br />
                            <input
                              name="address"
                              type="text"
                              className="form-control-profile"
                              id="address"
                              value={address}
                              onChange={(event) => {
                                this.setState({
                                  address: event.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-3 mt-lg-5">
                            <label htmlFor="phone" className="form-label">
                              Phone number :
                            </label>
                            <br />
                            <input
                              name="phone"
                              type="text"
                              className="form-control-profile"
                              id="phone"
                              value={phone}
                              onChange={(event) => {
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
                            <label
                              htmlFor="display-name"
                              className="form-label"
                            >
                              Display name :
                            </label>
                            <br />
                            <input
                              name="display"
                              type="text"
                              className="form-control-profile"
                              id="display-name"
                              value={display}
                              onChange={(event) => {
                                this.setState({
                                  display: event.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="mb-lg-5 mb-2">
                            <label htmlFor="first-name" className="form-label">
                              First name :
                            </label>
                            <br />
                            <input
                              name="firstname"
                              type="text"
                              className="form-control-profile"
                              id="first-name"
                              value={firstName}
                              onChange={(event) => {
                                this.setState({
                                  firstName: event.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="mb-lg-5 mb-2">
                            <label htmlFor="last-name" className="form-label">
                              Last name :
                            </label>
                            <br />
                            <input
                              name="lastname"
                              type="text"
                              className="form-control-profile"
                              id="last-name"
                              value={lastName}
                              onChange={(event) => {
                                this.setState({
                                  lastName: event.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4 mb-lg-5 mb-2">
                          <div className="mb-lg-5 mb-2">
                            <label htmlFor="birthdate" className="form-label">
                              DD/MM/YY :
                            </label>
                            <input
                              name="birthdate"
                              type="date"
                              className="form-control-profile"
                              id="birthdate"
                              value={birthdate}
                              onChange={(event) => {
                                this.setState({
                                  birthdate: event.target.value,
                                });
                              }}
                            />
                          </div>
                          <form>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={gender === "male"}
                                onChange={(event) => {
                                  this.setState({
                                    gender: event.target.value,
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check mt-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={gender === "female"}
                                onChange={(event) => {
                                  this.setState({
                                    gender: event.target.value,
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                Female
                              </label>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4">
                  <p className="question-edit fw-bold text-white text-center">
                    Do you want to save the <br /> changes?
                  </p>
                  <div className=" d-flex flex-column gap-3">
                    <button type="submit" className="btn-footer btn-choco">
                      Save Changes
                    </button>
                    <button type="button" className="btn-footer btn-yellow">
                      Cancel
                    </button>
                    <Link
                      to="/forgot"
                      type="button"
                      className="btn-footer btn-light text-start text-decoration-none"
                    >
                      Edit Password
                    </Link>
                    <Link
                      to="/logout"
                      type="button"
                      className="btn-footer btn-light text-start text-decoration-none"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
        <ModalWarning
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

export default Profile;
