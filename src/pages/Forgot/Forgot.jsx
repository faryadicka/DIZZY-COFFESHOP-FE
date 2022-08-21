import React, { useState } from "react";

// Component
import Footer from "../../components/Footer/Footer";

// Assets
import "../Forgot/Forgot.scoped.css";

function Forgot() {
  const [email, setEmail] = useState("");

  const sendLinkHandler = () => {};
  return (
    <>
      <div className="container-forgot">
        <main className="forgot-content">
          <div className="background-image-forgot">
            <div className="w-100 row text-center">
              <div className="col-md-12">
                <h1 className="text-white title-forgot">
                  Forgot your password?
                </h1>
                <p className="text-please text-white fw-bold">
                  Don't worry, we got your back!
                </p>
                <div className="ms-3 ms-lg-0 row gap-2 justify-content-center form-input-and-button">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="ps-4 py-4 rounded-4 bg-input-forgot"
                      placeholder="Enter your email adress to get link"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-2">
                    <button
                      onClick={sendLinkHandler}
                      className="fw-bold btn btn-warning w-100 py-4 rounded-4"
                    >
                      Send
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="ms-4 ms-lg-0 waiting-text text-white fw-bold">
                      Click here if you didn’t receive any link in 2 minutes
                    </p>
                    <button className="mt-4 w-50 py-4 rounded-4 btn btn-choco">
                      Resend Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Forgot;
