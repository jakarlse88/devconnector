import {
  ADD_POST,
  GET_POST_ARR,
  POST_LOADING
} from '../actions/types';

const initialState = {
  loading: false,
  postArr: [],
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        postArr: [...state.postArr, action.payload]
      };
    case GET_POST_ARR:
      return {
        ...state,
        loading: false,
        postArr: action.payload
      };
    default:
      return state;
  }
};
