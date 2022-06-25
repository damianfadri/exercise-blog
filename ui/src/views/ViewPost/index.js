import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import postService from 'api/postService';
import toast from 'react-hot-toast';
import Post from 'components/Post';
import Loading from 'components/Loading';

const WritePost = () => {
  const [ isLoading, setLoading ] = useState(false);
  const [ viewingPost, setViewingPost ] = useState(null);

  const params = useParams();
  const history = useHistory();

  const getPostFromId = (postId) => {
    setLoading(true);
    
    postService.getPost(postId).then((fetchedPost) => {
      setViewingPost(fetchedPost);
      setLoading(false);
    }).catch((e) => {
      toast.error('Post not found. Redirecting to blog posts page.');

      console.error(e);
      history.push('/blog');
    });
  };

  const deletePost = (post) => {
    setLoading(true);

    postService.deletePost(post.id).then(() => {
      toast.success(`Successfully deleted ${post.title}.`);

      history.push('/blog');
    }).catch((e) => {
      toast.error(`There was a problem deleting ${post.title}.`);

      console.error(e);
      setLoading(false);
    });
  };

  const addComment = (postId, comment) => {
    setLoading(true);

    postService.addComment(postId, comment).then(() => {
      toast.success(`Successfully added comment.`);

      getPostFromId(postId);

    }).catch((e) => {
      toast.error(`There was a problem in posting your comment.`);

      console.error(e);
      setLoading(false);
    })
  }

  const onEditPost = (post) => {
    history.push(`/blog/edit/${post.id}`);
  };

  const onDeletePost = (post) => {
    deletePost(post);
  };

  const onAddComment = (comment) => {
    let postId = params.id;
    addComment(postId, comment);
  };

  useEffect(() => {
    let postId = params.id;

    getPostFromId(postId);
  }, [ params.id ]);

  return (
    <>
      {
        !isLoading
          ? <Post { ...viewingPost }
              onEdit={ onEditPost }
              onDelete={ onDeletePost }
              onComment={ onAddComment } /> 
          : <Loading />
      }
    </>
  );
};

export default WritePost;