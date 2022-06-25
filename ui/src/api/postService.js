import utils from 'utils';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const postService = {
  getPosts: (filters) => {
    const qs = utils.getQuerystring(filters || {});
    return axios.get(`${apiUrl}/post?${qs}`);
  },

  getPost: (postId) => {
    return axios.get(`${apiUrl}/post/${postId}`);
  },

  savePost: (post) => {
    return axios.post(`${apiUrl}/post`, post);
  },

  updatePost: (postId, post) => {
    return axios.put(`${apiUrl}/post/${postId}`, post);
  },

  deletePost: (postId) => {
    return axios.delete(`${apiUrl}/post/${postId}`);
  },

  addComment: (postId, comment) => {
    return axios.post(`${apiUrl}/post/${postId}/comment`, comment);
  },
};

export default postService;