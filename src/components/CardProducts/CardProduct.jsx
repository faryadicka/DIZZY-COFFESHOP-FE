import React from "react";
import { useNavigate } from "react-router-dom";

// assets
import "../CardProducts/CardProduct.scoped.css";

// services
// import { getProductDetail } from "../../services/product";

export default function CardProduct(props) {
  const navigate = useNavigate();
  const { id } = props;
  const handleClick = () => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <button
      className="btn-products-card col-4 col-md-4 col-lg-3 ms-md-0"
      onClick={handleClick}
    >
      <div className="card card-products border-0 align-items-center text-center mb-md-5 mb-5">
        <img
          src={props.image}
          className="card-img-top rounded-circle"
          alt="product-img"
        />
        <span className="text-dark position-absolute translate-middle-y badge rounded-pill bg-white badge-position">
          {props.discount}
        </span>
        <div className="card-body">
          <p className="card-product-title">{props.title}</p>
          <p className="card-price">{props.price}</p>
        </div>
      </div>
    </button>
  );
}
