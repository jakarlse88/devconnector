import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POST_ARR,
  GET_ERRORS,
  POST_LOADING
} from './types';

// Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    );
};

// Get posts
export const getPostArr = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get('/api/posts')
    .then(res =>
      dispatch({ type: GET_POST_ARR, payload: res.data })
    )
    .catch(err =>
      dispatch({ type: GET_POST_ARR, payload: null })
    );
};

// Get post
export const getPost = postID => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/${postID}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_POST, payload: null });
    });
};

// Delete post
export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(res =>
      dispatch({ type: DELETE_POST, payload: postID })
    )
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    );
};

// Add like
export const addLike = postID => dispatch => {
  axios
    .post(`/api/posts/like/${postID}`)
    .then(res => dispatch(getPostArr()))
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    );
};

// Remove like
export const removeLike = postID => dispatch => {
  axios
    .post(`/api/posts/unlike/${postID}`)
    .then(res => dispatch(getPostArr()))
    .catch(err =>
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING // TODO: POST/POSTS?
  };
};
