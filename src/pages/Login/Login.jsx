import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

// assets
import "../Login/Login.scoped.css";
import Banner from "../../assets/img/signup.png";
import Logo from "../../assets/img/logo.png";
import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/twitter.png";
import Show from "../../assets/img/show.png";
import Hide from "../../assets/img/hide.png";

//components
import ModalWarning from "../../components/ModalWarning/ModalWarning";

//  Services
import { loginAuthService } from "../../services/login";

//Redux
// import { authActionRedux } from "../../redux/actionCreator/auth";

//  Helpers
import withNavigate from "../../helpers/withNavigate";
import withLocation from "../../helpers/withLocation";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      email: "",
      password: "",
      showPass: false,
      errMsg: "",
      succsessMsg: "",
      isLogin: false,
      token: localStorage.getItem("token"),
      modalShow: false,
    };
  }

  loginAuthPage = (event) => {
    event.preventDefault();
    // const { dispatch } = this.props;
    // dispatch(authActionRedux(this.state))
    //   .then((res) => {
    //     console.log(res.value);
    //     this.setState({
    //       succsessMsg: res.value.data.message,
    //       isLogin: true,
    //       token: res.value.data.data.token,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({
    //       isError: true,
    //       errMsg: err.response.data.message,
    //     });
    //   });
    loginAuthService(this.state)
      .then((res) => {
        this.setState({
          succsessMsg: res.data.message,
          isLogin: true,
        });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("role", res.data.data.role);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errMsg: err.response.data.message,
        });
      });
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state !== null && !state.isAuthenticated) {
      this.setState({
        modalShow: true,
      });
    }
  }
  render() {
    const { navigate } = this.props;
    console.log(this.state);
    return (
      <>
        <div className="container-auth">
          <aside className="picture">
            <img className="image-aside-auth" src={Banner} alt="auth-aside" />
          </aside>
          <div className="containter-main-footer-auth">
            <main className="main-auth">
              <header className="main-header-auth">
                <Link to="/">
                  <img src={Logo} alt="logo-coffeeshop" />
                </Link>
                <Link to="/" className="header-brand-auth">
                  <p>DIZZY COFFEE SHOP</p>
                </Link>
                <p className="header-title-auth">Login</p>
              </header>
              <form className="main-form-auth">
                <label className="label-auth" htmlFor="email">
                  Email Address :
                </label>
                <input
                  className="input-auth"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={this.state.email}
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({
                      email: event.target.value,
                    });
                  }}
                />
                <label className="label-auth" htmlFor="password">
                  Password :
                  <button
                    className="eye-button"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({
                        showPass: !this.state.showPass,
                      });
                    }}
                  >
                    <img
                      src={this.state.showPass ? Show : Hide}
                      alt="eye"
                      className="eye-pass"
                    />
                  </button>
                </label>
                <input
                  className="input-auth"
                  type={`${this.state.showPass ? "text" : "password"}`}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.setState({
                      password: event.target.value,
                    });
                  }}
                />
                <Link
                  to="/forgot"
                  className="mt-2 forgot-password text-decoration-none"
                >
                  Forgot password?
                </Link>
                <button
                  className="button-auth normal"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={this.loginAuthPage}
                >
                  Login
                </button>
                <Link to="/" className="button-auth google">
                  <img
                    className="google-button-login"
                    src={Google}
                    alt="google-logo"
                  />{" "}
                  <p className="login-google-text">Login with Google</p>
                </Link>
                <section className="has-account">
                  <div className="underline"></div>
                  <p className="already-account">Already have an account?</p>
                  <div className="underline"></div>
                </section>
                <Link to="/register" className="button-auth login">
                  <p className="register-google-text">Sign up Here</p>
                </Link>
              </form>
            </main>
            <footer className="footer-content-auth">
              <div className="footer-side">
                <div className="footer-title-auth">
                  <img src={Logo} alt="logo-coffeschop" />
                  <p className="footer-title">DIZZY COFFE SHOP</p>
                </div>
                <p className="footer-desc">
                  Coffee Shop is a store that sells some good meals, and
                  especially coffee. We provide high quality beans
                </p>
                <div className="footer-logo">
                  <img src={Facebook} alt="facebook-logo" />
                  <img src={Twitter} alt="twitter-logo" />
                  <img src={Instagram} alt="instagram-logo" />
                </div>
                <p className="copy-right">©DIZZY COFFEE SHOP</p>
              </div>
              <div className="footer-info">
                <p className="title-info-footer">Product</p>
                <ul className="product-info-auth">
                  <li className="info-detail">Download</li>
                  <li className="info-detail">Pricing</li>
                  <li className="info-detail">Location</li>
                  <li className="info-detail">Countries</li>
                  <li className="info-detail">Blog</li>
                </ul>
                <p className="title-info-footer">Engange</p>
                <ul className="product-info-auth">
                  <li className="info-detail">Coffee Shop?</li>
                  <li className="info-detail">About Us</li>
                  <li className="info-detail">FAQ</li>
                  <li className="info-detail">Privacy Policy</li>
                  <li className="info-detail">Term of Services</li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
        <ModalWarning
          message="You have to login first!!"
          showModal={this.state.modalShow}
          hideModal={() => {
            this.setState({ modalShow: false }, () =>
              navigate("/login", { replace: true, state: null })
            );
          }}
        />
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">
                  {!this.state.isLogin ? (
                    <p className="text-warning">
                      {this.state.errMsg}
                      {"!"}
                    </p>
                  ) : (
                    <p className="text-danger">{this.state.succsessMsg}</p>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (this.state.isLogin) {
                      navigate("/");
                      return window.scrollTo(0, 0);
                    }
                    this.setState({
                      email: "",
                    });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    auth: { data },
  } = state;
  return {
    data,
  };
};

export default connect(mapStateToProps)(withLocation(withNavigate(Login)));
