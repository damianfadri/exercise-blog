import React from 'react';
import utils from 'utils';
import moment from 'moment';
import styles from 'components/PostComment/PostComment.module.css';

const PostComment = ({ author, content, createDate }) => {
  const formatDate = (dateString) => {
    return moment.utc(dateString).local().format('D MMM yyyy hh:mm:ss A');
  };

  const formatAuthor = (author) => {
    return utils.isNullOrWhiteSpace(author) ? 'Anonymous' : author;
  };

  return (
    <>
    <div className="mb-3">
      <b>{ formatAuthor(author) }</b><br />
      <span className={ styles.subtitle }>{ formatDate(createDate) }</span>
    </div>

    <p>{ content }</p>
    </>
  );
};

export default PostComment;