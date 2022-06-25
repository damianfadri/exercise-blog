import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import utils from 'utils';
import useValidator from 'hooks/useValidator';

const onValidateTitle = (value) => {
  if (utils.isNullOrWhiteSpace(value)) {
    return 'Title is required';
  }

  if (value.length > 60) {
    return 'Title is too long (max 60 characters)';
  }

  return null;
};

const onValidateText = (value) => {
  if (utils.isNullOrWhiteSpace(value)) {
    return 'Content is required';
  }

  if (value.length > 10000) {
    return 'Content is too long (max 10000 characters)';
  }

  return null;
};

const PostForm = ({ defaultTitle, defaultContent, disabled, onSubmit }) => {
  const [ title, setTitle, titleDirty, titleError ] = useValidator(defaultTitle, onValidateTitle);
  const [ , setText, textDirty, textError ] = useValidator(defaultContent, onValidateText);
  const [ markup, setMarkup ] = useState(defaultContent);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const post = {
      title: title.trim(),
      content: markup.trim(),
    };

    onSubmit(post);
  };

  const onTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const onContentChange = (markup, delta, source, editor) => {
    setMarkup(markup);
    setText(editor.getText());
  };

  const isFormValid = () => {
    return (textDirty && !textError) 
        && (titleDirty && !titleError);
  };

  return (
    <Form onSubmit={ onFormSubmit }>
      <Form.Group className="mb-3">
        <Form.Control className="mb-1" 
            type="text" 
            placeholder="An interesting title"
            onChange={ onTitleChange } value={ title || '' }
            maxLength={ 60 }
            disabled={ disabled }
            tabIndex={ 1 } />
        { 
          titleDirty && titleError &&
            <small className="text-danger">{ titleError }</small>
        }

      </Form.Group>
      <Form.Group className="mb-3">
        <div className="edit-view">
          <ReactQuill 
              theme="snow" 
              value={ markup || ''} 
              onChange={ onContentChange } 
              tabIndex={ 2 }
              readOnly={ disabled }>
          </ReactQuill>
        </div>

        { 
          textDirty && textError &&
            <small className="text-danger">{ textError }</small>
        }
      </Form.Group>

      <Button variant="primary" type="submit" disabled={ !isFormValid() || disabled }>
        Publish
      </Button>
    </Form>
  );
};

export default PostForm;