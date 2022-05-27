import React from "react";

export default function CardTesti(props) {
  return (
    <div class="col-md-4 col-lg-4 my-3">
      <div class="card p-3 card-testi h-100">
        <div class="row">
          <div class="testi-profile d-flex justify-content-between">
            <div className="d-flex">
              <img
                class="img-avatar me-3"
                src="/assets/img/1-1.png"
                alt="profile-testi"
              />
              <div className="d-flex flex-column">
                <p class="name-testi">{props.name}</p>
                <p className="location-testi">{props.location}</p>
              </div>
            </div>
            <p class="rate-testi">4.5⭐</p>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">
            “Wow... I am very happy to spend my whole day here. the Wi-fi is
            good, and the coffee and meals tho. I like it here!! Very
            recommended!
          </p>
        </div>
      </div>
    </div>
  );
}
