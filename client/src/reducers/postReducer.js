import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
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
    case ADD_POST:
      return {
        ...state,
        postArr: [...state.postArr, action.payload]
      };
    case DELETE_POST:
      return {
        ...state,
        postArr: state.postArr.filter(
          post => post._id !== action.payload
        )
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case GET_POST_ARR:
      return {
        ...state,
        loading: false,
        postArr: action.payload
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
