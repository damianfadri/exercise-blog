import React, { useState, useEffect } from 'react';
import { Card, } from 'react-bootstrap';
import postService from 'api/postService';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PostForm from 'components/PostForm';
import Loading from 'components/Loading';

const EditPost = () => {
  const [ isFetching, setFetching ] = useState(false);
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ editingPost, setEditingPost ] = useState(null);

  const history = useHistory();
  const params = useParams();

  const onSavePost = (post) => {
    setSubmitting(true);
    const postId = params.id;
    
    postService.updatePost(postId, post).then((savedPost) => {
      toast.success(`Successfully updated ${savedPost.title}.`);

      history.push(`/blog/${postId}`);
    }).catch((e) => {
      toast.error('There was an error in updating the post.');

      console.error(e);
      setSubmitting(false);
    });
  };

  const getPostFromId = (postId) => {
    setFetching(true);
    
    postService.getPost(postId).then((fetchedPost) => {
      setEditingPost(fetchedPost);
      setFetching(false);
    }).catch((e) => {
      toast.error('Post not found. Redirecting to blog posts page.');

      console.error(e);
      history.push('/blog');
    });
  };

  useEffect(() => {
    let postId = params.id;

    getPostFromId(postId);
  }, [ params.id ]);

  return (
    <>
    <Card>
      <Card.Body>
        {
          !isFetching 
            ? <PostForm 
                defaultTitle={ editingPost?.title || '' }
                defaultContent={ editingPost?.content || '' }
                onSubmit={ onSavePost } 
                disabled={ isSubmitting } /> 
            : <Loading />
        }
      </Card.Body>
    </Card>
    </>
  );
};

export default EditPost;