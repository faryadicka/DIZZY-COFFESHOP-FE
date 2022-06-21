import React from "react";
import { Modal } from "react-bootstrap";

function ModalWarning({ showModal, hideModal, message, success }) {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body
        className={`${
          success ? "text-success" : "text-warning"
        } fw-bold text-center`}
      >
        {message}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWarning;
