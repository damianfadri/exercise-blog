import React from 'react';
import WritePost from 'views/WritePost';
import ViewPosts from 'views/ViewPosts';
import ViewPost from 'views/ViewPost';
import EditPost from 'views/EditPost';

import { Switch, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/PageContent';
import styles from 'layouts/BlogLayout/BlogLayout.module.css';
import { Toaster } from 'react-hot-toast';

const BlogLayout = () => {

  return (
    <>
      <Toaster position="top-right" />
      <Container fluid>
        <Row>
          <Sidebar />
          <main className={ 'p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2'}>
            <div className={ styles.mainContainer }>
              <Container fluid className="px-4">
                <Switch>
                  <Route exact path="/blog">
                    <PageContent subtitle="BLOG POSTS" title="View posts">
                      <ViewPosts />
                    </PageContent>
                  </Route>
                  <Route path="/blog/write">
                    <PageContent subtitle="BLOG POSTS" title="Write new post"> 
                      <WritePost />
                    </PageContent>
                  </Route>
                  <Route path="/blog/edit/:id">
                    <PageContent subtitle="BLOG POSTS" title="Edit existing post">
                      <EditPost />
                    </PageContent>
                  </Route>
                  <Route path="/blog/:id">
                    <PageContent subtitle="BLOG POSTS" title="View single post">
                      <ViewPost />
                    </PageContent>
                  </Route>
                </Switch>
              </Container>
            </div>
          </main>
        </Row>
      </Container>
     </>
  );
};

export default BlogLayout;