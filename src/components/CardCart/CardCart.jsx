import React from "react";
import currentPeriod from '../../helpers/formatCurrency'
import "./styles.css";

export default function CardCart(props) {
  return (
    <div className="d-flex justify-content-between pb-4">
      <div className="d-flex">
        <img
          className="rounded-circle img-payment"
          src={props.image}
          alt="imagepayment"
        />
        <p className="ms-3 name-payment">
          {props.name} <br />
          {props.qty}
          {"x"} <br />
          {props.size}
        </p>
      </div>
      <p className="price-payment">{currentPeriod(props.price)}</p>
    </div>
  );
}
