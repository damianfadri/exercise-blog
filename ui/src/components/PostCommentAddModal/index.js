import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import useValidator from 'hooks/useValidator';
import utils from 'utils';

const onValidateAuthor = (value) => {
  if (!utils.isNullOrWhiteSpace(value)) {
    if (value.length > 60) {
      return 'Author is too long (max 60 characters)';
    }
  }
};

const onValidateContent = (value) => {
  if (utils.isNullOrWhiteSpace(value)) {
    return 'Content is required';
  }

  if (value.length > 10000) {
    return 'Content is too long (max 10000 characters)';
  }

}

const PostCommentAddModal = ({ show, onSubmit, onCancel }) => {
  const [ author, setAuthor, , authorError ] = useValidator('', onValidateAuthor);
  const [ content, setContent, contentDirty, contentError ] = useValidator('', onValidateContent);

  const onChangeAuthor = (evt) => {
    setAuthor(evt.target.value);
  };

  const onChangeContent = (evt) => {
    setContent(evt.target.value);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const comment = {
      author: author.trim(),
      content: content.trim(),
    };

    onSubmit(comment);
  };

  const onModalCancel = () => {
    onCancel();
  };

  const isFormValid = () => {
    return (!authorError) && (contentDirty && !contentError);
  };

  return (
    <Modal show={ show } onHide={ onModalCancel }>
      <Modal.Header closeButton>
        <Modal.Title>Add New Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ onFormSubmit }>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
                placeholder="Anonymous"
                onChange={ onChangeAuthor }
                value={ author } />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control 
              as="textarea"
              style={{ resize: 'none' }}
              onChange={ onChangeContent }
              value={ content }
              placeholder="Leave a comment" />
          </Form.Group>

          <Form.Group>
            <Button type="submit" disabled={ !isFormValid() }>Submit</Button>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default PostCommentAddModal;