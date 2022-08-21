import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import currencyPeriod from "../../helpers/formatCurrency";

// assets
import "./CardHistory.scoped.css";

//component
import ModalAgreement from "../ModalAgreement/ModalAgreement";

export default function CardHistory({
  image,
  name,
  price,
  status,
  id,
  // modalHandler,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="col-md-3">
        <div className="card rounded-4 px-4 py-2">
          <div className="row gap-3 justify-content-between align-items-center">
            <div className="col-3">
              <img
                className="rounded-circle image-history"
                src={image}
                alt="imageH"
              />
            </div>
            <div className="col-6">
              <div className="card-title fw-bold">{name}</div>
              <div className="card-price-history">{currencyPeriod(price)}</div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <div className="card-price-history fw-bold">{status}</div>
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
              <FaTrash
                className="clickAble"
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalAgreement
        id={id}
        showModal={showModal}
        hideModal={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}
