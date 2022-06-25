import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import PostDeleteModal from 'components/PostDeleteModal';
import styles from 'components/Post/Post.module.css';
import IconButton from 'components/IconButton';
import moment from 'moment';
import { Link } from 'react-router-dom';
import utils from 'utils';
import PostComment from 'components/PostComment';
import PostCommentAddModal from 'components/PostCommentAddModal';

const previewStyle = {
  maxHeight: '50px',
  overflowY: 'hidden',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const Post = ({ id, title, createDate, content, author, comments, preview, 
      onEdit, onDelete, onComment }) => {

  const [ isDeleting, setDeleting ] = useState(false);
  const [ isCommenting, setCommenting ] = useState(false);

  const onClickDelete = () => {
    setDeleting(true);
  };

  const onClickEdit = () => {
    onEdit({
      id: id,
      author: author,
      createDate: createDate,
      title: title,
      content: content,
    });
  };

  const onCancelDelete = () => {
    setDeleting(false);
  };

  const onConfirmDelete = () => {
    onDelete({
      id: id,
      author: author,
      createDate: createDate,
      title: title,
      content: content,
    });
  };

  const onClickComment = () => {
    setCommenting(true);
  };

  const onCancelComment = () => {
    setCommenting(false);
  };

  const onConfirmComment = (comment) => {
    onComment(comment);
  };

  const formatDate = (dateString) => {
    return moment.utc(dateString).local().format('D MMM yyyy hh:mm:ss A');
  };

  const formatAuthor = (author) => {
    return utils.isNullOrWhiteSpace(author) ? 'Anonymous' : author;
  };

  const formatCommentCount = (comments) => {
    let suffix = 'comments';
    const length = (comments || []).length;

    if (length === 1) {
      suffix = 'comment';
    }

    return `${length} ${suffix}`;
  };

  return (
    <>
      <PostDeleteModal 
        title={ title } 
        show={ isDeleting }
        onConfirm={ onConfirmDelete }
        onCancel={ onCancelDelete } /> 

     <PostCommentAddModal 
        show={ isCommenting }
        onSubmit={ onConfirmComment }
        onCancel={ onCancelComment } />
      
      <Card>
        <Card.Body>
          <IconButton style={{ marginTop: '4px', float: 'right' }}
              iconClass="fa-times"
              onClick={ onClickDelete }
              tooltip="Delete post" />

          <IconButton style={{ float: 'right' }} 
              iconClass="fa-edit"
              onClick={ onClickEdit }
              tooltip="Edit post" />

          <Link className={ styles.link } to={ `/blog/${id}` }>
            <h4>
              <span className={ styles.title }>{ title }</span>
            </h4>
          </Link>
         
          <div className={ styles.authorContainer }>
            <i className={ styles.authorIcon + ' fa fa-user-circle' }></i>
            <span className={ styles.authorText }>{ formatAuthor(author) }</span>
            <span className={ styles.subtitle }>{ formatDate(createDate) }</span>
          </div>

        </Card.Body>

        <ReactQuill 
            theme="bubble" 
            readOnly={ true }
            value={ content }
            style={ preview ? previewStyle : null }
            modules={{ toolbar: [] }}
            formats={ preview ? [] : null } />

          {
            preview
              ? <Card.Body>
                  <Link 
                    className={ styles.link } 
                    to={ `/blog/${id}` }>
                      <IconButton 
                          style={{ display: 'inline' }} 
                          tooltip="View post" 
                          iconClass="fa-ellipsis-h"
                          onClick={ () => {} } />
                  </Link>
                  <br />

                  <Link 
                      className={ styles.link }
                      to={ `/blog/${id}` }>
                    <span className={ styles.subtitle }>{ formatCommentCount(comments) }</span>
                  </Link>
                 
                </Card.Body>
                : null
          }
      </Card>
      
      {
        !preview && 
          <Card>
            <Card.Body>
              <h5 style={{ display: 'inline' }}>Comments</h5> 
              <IconButton 
                  style={{ display: 'inline' }}  
                  iconClass="fa-plus"
                  tooltip="Add comment"
                  onClick={ onClickComment } />
    
              <ListGroup variant="flush">
                {
                  comments && comments.length > 0 
                    ? comments.sort((a, b) => (
                      moment(b.createDate) - moment(a.createDate)
                    )).map(comment => (
                        <ListGroup.Item key={ comment.id }>
                          <PostComment { ...comment } />
                        </ListGroup.Item>
                      ))
    
                    : <div className={ styles.noComments }>
                        <i className="fa fa-comment"></i><br />
                        <span>No comments yet</span>
                      </div>
                }
              </ListGroup>
            </Card.Body>
          </Card>
      }
      
    </>
  )
};

export default Post;