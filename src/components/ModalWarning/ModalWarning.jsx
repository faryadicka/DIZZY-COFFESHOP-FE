import React from "react";
import { Modal } from "react-bootstrap";

function ModalWarning({ showModal, hideModal, message }) {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-danger fw-bold text-center">
        {message}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWarning;
