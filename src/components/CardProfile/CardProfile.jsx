import React from "react";

// assets
import "../CardProfile/CardProfile.scoped.css";
import Pencil from "../../assets/img/pencil.png";

export default function CardProfile(props) {
  return (
    <div className="col-10 col-lg-4">
      <div className="card pt-3 text-center align-items-center edit-column-first">
        <img
          src={props.profile}
          className="card-img-top rounded-circle"
          alt="profile"
        />
        <button className="btn-edit-logo">
          <div className="logo-circle-first rounded-circle">
            <img src={Pencil} alt="edit" className="edit-pencil-ava" />
          </div>
        </button>
        <div className="card-body">
          <h5 className="display-name fw-bold">{props.name}</h5>
          <p className="email-profile">{props.email}</p>
          <p className="delivery-info mt-4">Has been ordered 15 products</p>
        </div>
      </div>
    </div>
  );
}
