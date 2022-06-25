import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Loading from 'components/Loading';
import postService from 'api/postService';
import SearchPanel from 'components/SearchPanel';
import PaginationPanel from 'components/PaginationPanel';
import Post from 'components/Post';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from 'views/ViewPosts/ViewPosts.module.css';

const defaultSearchFilter = {
  page: 0,
  sortOrder: 'desc',
  sortField: 'createDate',
  keyword: '',
};

const ViewPosts = () => {
  const history = useHistory();

  const [ posts, setPosts ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(1);
  const [ isLoading, setLoading ] = useState(false);

  const [ searchFilter, setSearchFilter ] = useState(defaultSearchFilter);

  const getPosts = (filters) => {
    setLoading(true);

    return postService.getPosts(filters).then((fetchedPosts) => {
      setPosts(fetchedPosts.content);

      setSearchFilter((sFilter) => {
        sFilter.page = fetchedPosts.number;
        sFilter.sortOrder = filters.sortOrder;
        sFilter.sortField = filters.sortField;
        sFilter.keyword = filters.keyword;
        return sFilter;
      });

      setTotalPages(fetchedPosts.totalPages);
      setLoading(false);
      
    }).catch((e) => {
      console.error(e);

      toast.error('There was a problem fetching posts from the server.');
      setPosts([]);
      setLoading(false);
    });
  };

  const deletePost = (post) => {
    setLoading(true);

    postService.deletePost(post.id).then(() => {
      toast.success(`Successfully deleted ${post.title}.`);

      setLoading(false);
    }).catch((e) => {
      toast.error(`There was a problem deleting ${post.title}.`);

      console.error(e);
      setLoading(false);
    }).then(() => {
      return getPosts({ ...searchFilter,  });
    });
  };

  const onEditPost = (post) => {
    history.push(`/blog/edit/${post.id}`);
  };

  const onDeletePost = (post) => {
    deletePost(post);
  };

  const onClickPagination = (page) => {
    getPosts({
      ...searchFilter,
      page: page - 1,
    });
  };

  const onSearchAndSort = (filters) => {
    getPosts({
      ...searchFilter,
      ...filters,
      page: 0,
    });
  };

  useEffect(() => {
    getPosts({
      ...searchFilter,
      page: 0,
    });
  }, [ searchFilter ]);

  return (
    <>
      <Col lg={ 9 }>
        { posts && posts.length > 0 &&
            <PaginationPanel 
                currentPage={ searchFilter.page + 1 }
                totalPages={ totalPages }
                onChangePage={ onClickPagination } />
        }
        {
          isLoading ?
            <Loading /> :
            <>
              {
                posts && posts.length > 0 
                  ? (posts.map((post) => (
                    <Post key={ post.id } { ...post }
                        preview={ true }
                        onEdit={ onEditPost }
                        onDelete={ onDeletePost }
                        onComment={ () => {} } />
                  ))) 
                  : <div className={ styles.noPosts }>
                      <i className="fa fa-folder-open" 
                          style={{ fontSize: '24px' }} /><br />
                      <h3>No posts found</h3>
                    </div>
              }
            </>
        }
        { posts && posts.length > 0 &&
            <PaginationPanel 
                currentPage={ searchFilter.page + 1 }
                totalPages={ totalPages }
                onChangePage={ onClickPagination } />
        }
      </Col>
      <Col lg={ 3 }>
        <SearchPanel 
            defaultKeyword={ searchFilter?.keyword } 
            defaultSortField={ searchFilter?.sortField }
            defaultSortOrder={ searchFilter?.sortOrder }
            onSearch={ onSearchAndSort } />
      </Col>
    </>    
  );
};

export default ViewPosts;