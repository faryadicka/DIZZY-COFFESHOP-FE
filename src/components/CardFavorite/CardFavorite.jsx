import React from "react";
import { useNavigate } from "react-router-dom";

import currencyPeriod from "../../helpers/formatCurrency";

//Assets
import "../CardFavorite/CardFavorite.scoped.css";
import Checklist from "../../assets/img/checklist.png";

export default function CardFavorite(props) {
  const navigate = useNavigate();
  return (
    <div className="col-12 col-sm-8 col-md-3">
      <div className="card p-3 rounded-4 card-fav-600">
        <img
          src={props.image}
          className="card-img-top rounded-circle mx-auto"
          alt="img-product"
        />
        <div className="card-body card-body-600">
          <h5 className="card-title text-center mt-md-3">{props.title}</h5>
          <ul className="list-group list-group-flush border-0">
            <li className="list-group-item border-0 p-0 p-md-3">
              <img src={Checklist} alt="" />
              An item
            </li>
            <li className="list-group-item border-0 p-0 p-md-3">
              <img src={Checklist} alt="" />A second item
            </li>
            <li className="list-group-item border-0 p-0 p-md-3">
              <img src={Checklist} alt="" />A third item
            </li>
          </ul>
        </div>
        <div className="price mt-4 text-center">
          <h3 className="price-detail">{currencyPeriod(props.price)}</h3>
          <button
            onClick={() => {
              navigate(`/products/detail/${props.id}`);
            }}
            type="button"
            className="btn btn-outline-warning btn-select"
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
}
