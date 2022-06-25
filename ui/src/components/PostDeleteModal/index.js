import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostDeleteModal = ({ title, show, onConfirm, onCancel }) => {
  const onModalCancel = () => {
    onCancel();
  };
  
  const onModalConfirm = () => {
    onConfirm();
  };

  return (
    <Modal show={ show } onHide={ onModalCancel }>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete <b>{ title }</b>? <br />
          The deletion is permanent and cannot be undone.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ onModalCancel }>Cancel</Button>
        <Button variant="danger" onClick={ onModalConfirm }>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default PostDeleteModal;