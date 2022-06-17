import React, { Component } from "react";

import EmptyCart from "../../assets/img/emptyCart.png";

export class CardUnOrdered extends Component {
  render() {
    return (
      <>
        <div className="col-10 col-md-10">
          <div className="card rounded-4 px-3 h-100">
            <div className="card-body text-center">
              <img
                src={EmptyCart}
                className="card-img-top mt-5"
                alt="emptycart"
              />
              <h4 className="header-payment-card card-title text-center mt-3">
                THERE ARE NO ORDERS
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CardUnOrdered;
