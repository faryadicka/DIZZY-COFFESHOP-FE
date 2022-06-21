import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import NavbarHome from "../../components/NavbarHome/Navbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardFavorite from "../../components/CardFavorite/CardFavorite";
import CardTesti from "../../components/CardTesti/CardTesti";

// assets
import "./Home.scoped.css";
import User from "../../assets/img/user.png";
import Location from "../../assets/img/location.png";
import Teamwork from "../../assets/img/team-work.png";
import Checklist from "../../assets/img/checklis.png";
import Netflix from "../../assets/img/netflix.png";
import Reddit from "../../assets/img/reddit.png";
import Discord from "../../assets/img/discord.png";
import Spotify from "../../assets/img/spotify.png";
import Amazon from "../../assets/img/amazon.png";
import Slide from "../../assets/img/slide.png";
import Left from "../../assets/img/left.png";
import Right from "../../assets/img/right.png";
import Map from "../../assets/img/map.png";

//axios
import { getFavoriteHome } from "../../services/product";

//actionRedux
import { getProfileRedux } from "../../redux/actionCreator/auth";
// import Navbar from "../../components/Navbar/Navbar";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: [],
    };
  }
  getFavoriteHomeCard = () => {
    getFavoriteHome()
      .then((res) => {
        this.setState({
          favorite: res.data.data,
        });
      })
      .catch((err) => {
        console.log("ERROR GET DATA FAVORITE", err);
      });
  };

  componentDidMount() {
    const {
      dispatch,
      authData: { token },
      isLoggedIn,
    } = this.props;
    this.getFavoriteHomeCard();
    if (isLoggedIn) {
      dispatch(getProfileRedux(token));
    }
  }
  render() {
    const {
      authData: { token },
      userData: { image_profile },
    } = this.props;
    return (
      <>
        {token ? <Navbar profile={image_profile} /> : <NavbarHome />}
        <header className="header-home">
          <div className="header-content mb-5 border">
            <div className="container">
              <h1 className="title-header text-white fw-bold">
                Start Your Day with
                <br /> Coffee and Good Meals
              </h1>
              <p className="desc-header text-white">
                We provide high quality beans, good taste, and healthy
                <br /> meals made by love just for you. Start your day with us
                <br /> for a bigger smile!
              </p>
              <button type="button" className="btn btn-warning btn-started">
                Get Started
              </button>
            </div>
          </div>
          <div className="row info-coffe-shop p-5 m-0 m-md-0 m-xl-0">
            <div className="col-md-12">
              <div className="card-company-info card p-5 border-0 shadow mb-5 bg-body rounded-3">
                <div className="card-body">
                  <div className="row justify-content-lg-between gap-2">
                    <div className="col-md-3 text-center d-flex">
                      <img className="image-info" src={User} alt="staff" />
                      <p className="staff-info ms-2">
                        <strong>90+</strong>
                        <br />
                        Staff
                      </p>
                    </div>
                    <div className="col-md-3 column-info-second d-flex">
                      <img
                        className="image-info"
                        src={Location}
                        alt="location"
                      />
                      <p className="location-info ms-2">
                        <strong>30+</strong>
                        <br />
                        Stores
                      </p>
                    </div>
                    <div className="col-md-3 d-flex">
                      <img className="image-info" src={User} alt="costumers" />
                      <p className="costumers-info ms-2">
                        <strong>800+</strong>
                        <br />
                        Costumers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row info-quality-home ps-5 m-0 m-md-0 m-xl-0">
            <div className="col-md-6">
              <img
                src={Teamwork}
                alt="team-work-pict"
                className="team-work-pict"
              />
            </div>
            <div className="col-md-5">
              <div className="card p-md-4 border-0">
                <div className="col-md-8">
                  <h1 className="header-title">
                    We Provide Good Coffee and Healthy Meals
                  </h1>
                  <p className="desc-title">
                    You can explore the menu that we provide with fun and have
                    their own taste and make your day better.
                  </p>
                </div>
                <div className="row-cols-auto">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0">
                      <img src={Checklist} alt="check" /> High quality beans
                    </li>
                    <li className="list-group-item border-0">
                      <img src={Checklist} alt="check" /> Healthy meals, you can
                      request the ingredients
                    </li>
                    <li className="list-group-item border-0">
                      <img src={Checklist} alt="check" /> Chat with our staff to
                      get better experience for ordering
                    </li>
                    <li className="list-group-item border-0">
                      <img src={Checklist} alt="check" /> Free member card with
                      a minimum purchase of IDR 200.000.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="favorite-product mt-5 p-5 info-quality-home m-0 m-md-0 m-xl-0">
            <div className="row-cols-1 text-center">
              <h1 className="header-fav">Here is People's Favorite</h1>
              <p className="desc-fav">
                Let’s choose and have a bit taste of poeple’s favorite. It might
                be yours too!
              </p>
            </div>
          </div>
          <div className="w-100 m-0 row p-5 gap-3 justify-content-sm-center justify-content-md-evenly">
            {this.state.favorite.map((item) => {
              return (
                <CardFavorite
                  image={`${item.image}`}
                  title={item.name}
                  price={`IDR ${item.price}`}
                  key={item.id}
                />
              );
            })}
          </div>
          <div className="row map-global text-center justify-content-center">
            <div className="col-md-4 mt-5">
              <h1 className="title-map">
                Visit Our Store in the Spot on the Map Below
              </h1>
              <p className="desc-map">
                See our store in every city on the spot and spen your good day
                there. See you soon!
              </p>
            </div>
            <div className="row">
              <div className="col-md mt-5">
                <img className="map-image w-100" src={Map} alt="map" />
              </div>
            </div>
          </div>
          <div className="w-100 row partner-info mt-5">
            <h1 className="title-partner-info fw-bold text-center">
              Our Partner
            </h1>
          </div>
          <div className="w-100 row justify-content-center mt-5 gap-5 mx-auto text-center">
            <div className="col-6 col-md-4 col-lg-2 ">
              <img className="image-sponsored" src={Netflix} alt="netflix" />
            </div>
            <div className="col-6 col-md-4 col-lg-2 ">
              <img className="image-sponsored" src={Reddit} alt="reddit" />
            </div>
            <div className="col-6 col-md-4 col-lg-2 ">
              <img className="image-sponsored" src={Amazon} alt="amazon" />
            </div>
            <div className="col-6 col-md-4 col-lg-2 ">
              <img className="image-sponsored" src={Discord} alt="discord" />
            </div>
            <div className="col-6 col-md-4 col-lg-2 ">
              <img className="image-sponsored" src={Spotify} alt="spotify" />
            </div>
          </div>
          <div className="row mt-5 justify-content-center w-100">
            <div className="col-md-5 text-center ">
              <h1 className="testimoni-title fw-bold">
                Loved by Thousands of Happy Customer
              </h1>
              <p className="desc-testimoni mt-5">
                These are the stories of our customers who have visited us with
                great pleasure.
              </p>
            </div>
          </div>
          <div className="row mx-auto mt-5 px-5">
            <CardTesti name="nama" location="location" />
          </div>
          <div className="mx-5 row slide-logo mt-5 justify-content-between p-4 gap-5">
            <div className="col-md-3 slide-card">
              <img src={Slide} alt="slide" />
            </div>
            <div className="col-md-3 slide-card">
              <div className="row justify-content-center">
                <img className="prev-image" src={Left} alt="left" />
                <img className="prev-image" src={Right} alt="right" />
              </div>
            </div>
          </div>
          <div className="check-promo mx-5 mt-5">
            <div className="card p-5">
              <div className="card-body">
                <div className="row justify-content-lg-between">
                  <div className="col-md-4">
                    <h2 className="card-title fw-bold">
                      Check our promo today!
                    </h2>
                    <p className="card-text">
                      Let's see the deals and pick yours!
                    </p>
                  </div>
                  <div className="col-md-2">
                    <button href="#" className="btn btn-warning btn-promo ">
                      See promo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    auth: { authData, isLoggedIn },
  } = state;
  return {
    authData,
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(Home);
