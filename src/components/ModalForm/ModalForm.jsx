import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";

//AXIOS
import { updatePasswordAxios } from "../../services/users";

function ModalForm({ showModal, hideModal }) {
  const token = useSelector((state) => state.auth.authData?.token);
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [match, setMatch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const editPasswordHandler = (e) => {
    e.preventDefault();
    console.log("Loading");
    setLoading(true);
    if (form.newPassword !== form.confirmPassword) {
      setShow(true);
      setMatch(false);
      setIsError(true);
      setMessage({ ...message, error: "Password is not match!" });
      setLoading(false);
      return;
    }
    const body = {
      newPassword: form.newPassword,
    };
    updatePasswordAxios(body, token)
      .then((res) => {
        setLoading(false);
        setMessage({ ...message, success: res.data?.message });
        setIsError(false);
        setShow(true);
        setForm({ ...form, newPassword: "", confirmPassword: "" });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({ ...message, error: err.response?.data.message });
        setShow(true);
        setIsError(true);
        setForm({ ...form, newPassword: "", confirmPassword: "" });
      });
  };

  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <form onSubmit={editPasswordHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column text-center justify-content-center align-items-center">
              <label htmlFor="newPass">New Password : </label>
              <input
                type="password"
                id="newPass"
                className="rounded rounded-3 p-1 w-75 mt-3"
                placeholder="Input new password"
                onChange={(e) => {
                  setForm({ ...form, newPassword: e.target.value });
                }}
              />
            </div>
            <div className="d-flex flex-column text-center justify-content-center align-items-center">
              <label htmlFor="confirm" className="mt-3">
                Confirm Password :{" "}
              </label>
              <input
                type="password"
                id="confirm"
                className="rounded rounded-3 p-1 w-75 mt-3"
                placeholder="Input confirm password"
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex flex-row justify-content-between px-3">
            {show ? (
              <div>
                {isError ? (
                  <p className="text-danger">{message.error}</p>
                ) : (
                  <p className="text-success">{message.success}</p>
                )}
              </div>
            ) : null}
            <div>
              <button
                onClick={hideModal}
                type="button"
                className="btn btn-secondary"
              >
                Close
              </button>
              <button disabled={loading} type="submit" className="btn btn-choco ms-2">
                {loading ? "Please wait ..." : "Save changes"}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalForm;
