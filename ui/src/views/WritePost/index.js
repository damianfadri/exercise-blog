import React, { useState } from 'react';
import { Card, } from 'react-bootstrap';
import postService from 'api/postService';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import PostForm from 'components/PostForm';

const WritePost = () => {
  const [ isSubmitting, setSubmitting ] = useState(false);
  const history = useHistory();

  const onSavePost = (post) => {
    setSubmitting(true);
    postService.savePost(post).then((savedPost) => {
      toast.success(`Successfully published ${savedPost.title}`);

      history.push(`/blog/${savedPost.id}`);
    }).catch((e) => {
      toast.error('There was a problem in publishing the post.');

      console.error(e);
      setSubmitting(false);
    });
  };

  return (
    <>
    <Card>
      <Card.Body>
        <PostForm 
            defaultTitle={ '' }
            defaultContent={ '' }
            onSubmit={ onSavePost } 
            disabled={ isSubmitting } />
      </Card.Body>
    </Card>
    </>
  );
};

export default WritePost;