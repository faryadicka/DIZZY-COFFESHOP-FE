import React, { useState } from "react";

// Component
import Footer from "../../components/Footer/Footer";

// Assets
import "../Forgot/Forgot.scoped.css";

//Axios
import { forgotAxios } from "../../services/auth";

function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    error: "",
    success: "",
    show: false,
  });
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendLinkHandler = () => {
    setLoading(true);
    const body = { email };
    forgotAxios(body)
      .then((res) => {
        console.log(res);
        setMessage({ ...message, success: res.data.data?.message });
        setMessage({ ...message, show: true });
        setIsError(false);
        setLoading(false);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
        setMessage({ ...message, error: err.response?.data.message });
        setMessage({ ...message, show: true });
        setIsError(true);
        setLoading(false);
      });
  };
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
                      {loading ? "Please wait ..." : "Send"}
                    </button>
                  </div>
                </div>
                {message.show ? (
                  <>
                    {isError ? (
                      <p className="ms-4 ms-lg-0 waiting-text text-danger fw-bold">
                        {message.error}
                      </p>
                    ) : (
                      <p className="ms-4 ms-lg-0 waiting-text text-white fw-bold">
                        Please check your email for password confirmation!
                      </p>
                    )}
                  </>
                ) : null}
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
