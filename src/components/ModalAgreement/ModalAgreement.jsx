import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
//assets
import "./styles.css";
//axios
import { softDeleteAxios } from "../../services/history";

function ModalAgreement({ showModal, hideModal, id }) {
  const token = useSelector((state) => state.auth.authData?.token);

  const softDeleteHandler = () => {
    const body = {
      idTransaction: id,
    };
    softDeleteAxios(token, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Modal centered show={showModal} onHide={hideModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="fw-bold text-dark">
          Are you sure delete this history?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-choco" onClick={hideModal}>
            CANCEL
          </button>
          <button
            onClick={() => {
              softDeleteHandler();
            }}
            className="btn btn-danger"
          >
            YES
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgreement;
