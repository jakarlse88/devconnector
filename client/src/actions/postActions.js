import axios from 'axios';
import {
  ADD_POST,
  GET_POST_ARR,
  GET_ERRORS,
  POST_LOADING // TODO: POST/POSTS?
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING // TODO: POST/POSTS?
  };
};
