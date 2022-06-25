import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'font-awesome/css/font-awesome.min.css';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';
import BlogLayout from 'layouts/BlogLayout';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Setup interceptors
axios.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route path="/blog" render={(props) => <BlogLayout {...props} />} />
          <Redirect to="/blog" />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
