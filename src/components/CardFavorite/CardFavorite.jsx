import React from "react";

//Component

//Assets
import "../CardFavorite/CardFavorite.scoped.css";
import Checklist from "../../assets/img/checklist.png";

export default function CardFavorite(props) {
  return (
    <div class="col-12 col-sm-8 col-md-3">
      <div class="card h-100 p-3 rounded-4">
        <img
          src={props.image}
          class="card-img-top rounded-circle mx-auto"
          alt="img-product"
        />
        <div class="card-body">
          <h5 class="card-title text-center mt-3">{props.title}</h5>
        </div>
        <ul class="list-group list-group-flush border-0">
          <li class="list-group-item border-0">
            <img src={Checklist} alt="" />
            An item
          </li>
          <li class="list-group-item border-0">
            <img src={Checklist} alt="" />A second item
          </li>
          <li class="list-group-item border-0">
            <img src={Checklist} alt="" />A third item
          </li>
        </ul>
        <div class="price mt-5 text-center">
          <h3 class="price-detail">{props.price}</h3>
          <button type="button" class="btn btn-outline-warning btn-select">
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
}
