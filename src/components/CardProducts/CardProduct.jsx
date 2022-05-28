import React from "react";

// assets
import "../CardProducts/CardProduct.scoped.css";

export default function CardProduct(props) {
  return (
    <div class="col-6 col-md-4 col-lg-3 ms-5">
      <div class="card card-products border-0 align-items-center text-center mb-5">
        <img
          src={props.image}
          class="card-img-top rounded-circle"
          alt="product-img"
        />
        <div class="card-body">
          <h6 class="card-title">{props.title}</h6>
          <p class="card-price">{props.price}</p>
        </div>
      </div>
    </div>
  );
}
