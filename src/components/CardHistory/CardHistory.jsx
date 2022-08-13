import React from "react";
import { FaTrash } from "react-icons/fa";
import currencyPeriod from '../../helpers/formatCurrency'

// assets
import "./CardHistory.scoped.css";

export default function CardHistory(props) {
  // console.log(props.id);
  return (
    <div className="col-md-3">
      <div className="card rounded-4 px-4 py-2">
        <div className="row gap-3 justify-content-between align-items-center">
          <div className="col-3">
            <img
              className="rounded-circle image-history"
              src={props.image}
              alt="imageH"
            />
          </div>
          <div className="col-6">
            <div className="card-title fw-bold">{props.name}</div>
            <div className="card-price-history">{currencyPeriod(props.price)}</div>
            <div className="row justify-content-between">
              <div className="col-auto">
                <div className="card-price-history fw-bold">{props.status}</div>
              </div>
              <div className="col-auto">
                {/* <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={() => props.onDeleteCard(props.id)}
                /> */}
              </div>
            </div>
          </div>
          <div className="col-1">
            <FaTrash className="clickAble" />
          </div>
        </div>
      </div>
    </div>
  );
}
