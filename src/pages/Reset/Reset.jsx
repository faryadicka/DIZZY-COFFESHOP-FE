import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Component
import Footer from "../../components/Footer/Footer";

// Assets
import "./styles.css";

//Axios
import { resetAxios } from "../../services/auth";

function Reset() {
  const params = useParams();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [showEye1, setShowEye1] = useState(false);

  const resetPassHandler = () => {
    setLoading(true);
    const body = {
      newPassword: form.newPassword,
    };
    if (form.newPassword !== form.confirmPassword) {
      setShow(true);
      setIsError(true);
      setMessage({ ...message, error: "Password is not match!" });
      setLoading(false);
      return;
    }
    resetAxios(body, params.otp)
      .then((res) => {
        setLoading(false);
        setIsError(false);
        setMessage({ ...message, success: "Reset password succes!" });
        setShow(true);
        setForm({ ...form, newPassword: "", confirmPassword: "" });
      })
      .catch((err) => {
        setLoading(false);
        setShow(true);
        setIsError(true);
        setMessage({ ...message, error: "Reset password failed!" });
        setForm({ ...form, newPassword: "", confirmPassword: "" });
      });
  };
  return (
    <>
      <div className="container-forgot">
        <main className="forgot-content">
          <div className="background-image-forgot">
            <div className="w-100 row justify-content-center align-items-center">
              <div className="col-md-6 mt-5">
                <div className="d-flex flex-column text-center justify-content-center align-items-center mt-5">
                  <label htmlFor="newPass" className="text-white">
                    New Password :{" "}
                  </label>
                  <input
                    type={showEye ? "text" : "password"}
                    id="newPass"
                    className="rounded rounded-3 w-75 mt-3 form-pass-reset"
                    placeholder="Input new password"
                    value={form.newPassword}
                    onChange={(e) => {
                      setForm({ ...form, newPassword: e.target.value });
                    }}
                  />
                  <div
                    className="show-eye-1"
                    onClick={() => {
                      setShowEye(!showEye);
                    }}
                  >
                    {showEye ? <FaEye size={30} /> : <FaEyeSlash size={30} />}
                  </div>
                </div>
                <div className="d-flex flex-column text-center justify-content-center align-items-center">
                  <label htmlFor="confirm" className="mt-3 text-white">
                    Confirm Password :{" "}
                  </label>
                  <input
                    type={showEye1 ? "text" : "password"}
                    id="confirm"
                    className="rounded rounded-3 w-75 mt-3 form-pass-reset"
                    placeholder="Input confirm password"
                    value={form.confirmPassword}
                    onChange={(e) => {
                      setForm({ ...form, confirmPassword: e.target.value });
                    }}
                  />
                  <div
                    className="show-eye-2"
                    onClick={() => {
                      setShowEye1(!showEye1);
                    }}
                  >
                    {showEye1 ? <FaEye size={30} /> : <FaEyeSlash size={30} />}
                  </div>
                  {show ? (
                    <>
                      {isError ? (
                        <p className="fw-bold text-danger">{message.error}</p>
                      ) : (
                        <p className="fw-bold text-success text-bg-light p-2 rounded rounded-2">{message.success}</p>
                      )}
                    </>
                  ) : null}
                  <button
                    disabled={loading}
                    onClick={resetPassHandler}
                    className="btn btn-lg btn-warning mt-5"
                  >
                    {loading ? "Please wait ..." : "Save Changes"}
                  </button>
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

export default Reset;
