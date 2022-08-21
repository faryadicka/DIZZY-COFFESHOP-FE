import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Component
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import NavbarHome from "../../components/NavbarHome/Navbar";
import CardHistory from "../../components/CardHistory/CardHistory";

// Assets
import "../History/History.scoped.css";
//Axios
import { getAllhistories } from "../../services/history";

function Histories() {
  const token = useSelector((state) => state.auth.authData?.token);
  const [histories, setHsitories] = useState([]);

  const getHistoryProducts = (token) => {
    getAllhistories(token)
      .then((res) => {
        setHsitories(res.data.data);
      })
      .catch((err) => {
        console.log("GET DATA TRANSACTION FAILED", err);
      });
  };

  useEffect(() => {
    getHistoryProducts(token);
  }, [histories, token]);

  return (
    <>
      {token ? <Navbar /> : <NavbarHome />}
      <main className="main-history mt-5">
        <div className="container">
          <div className="row">
            <h1 className="history-title text-center text-white">
              Let’s see what you have bought!
              <br />{" "}
              <span className="guide-history">Select item to delete</span>
            </h1>
          </div>
          <div className="row justify-content-center gap-3 mt-5">
            {histories.length === 0 ? (
              <p className="text-white fw-bold fs-6 text-center">
                NO PRODUCTS HAVE BEEN PURCHASE
              </p>
            ) : (
              histories.map((item) => {
                return (
                  <CardHistory
                    image={`${item.image}`}
                    name={item.name}
                    price={`IDR ${item.price}`}
                    status="Delivery"
                    key={item.id}
                    id={item.id}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Histories;
