import React from "react";

export default function CardHistory(props) {
  return (
    <div className="col-md-3">
      <div className="card rounded-4 p-2">
        <div className="row gap-3">
          <div className="col-3">
            <img
              className="rounded-circle"
              src={props.image}
              alt="imagehistory"
            />
          </div>
          <div className="col-8">
            <div className="card-title fw-bold">{props.name}</div>
            <div className="card-text">{props.price}</div>
            <div className="row justify-content-between">
              <div className="col-auto">
                <div className="card-text">{props.status}</div>
              </div>
              <div className="col-auto">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
