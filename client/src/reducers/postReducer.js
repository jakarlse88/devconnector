import { ADD_POST } from '../actions/types';

const initialState = {
  loading: false,
  postsArr: [],
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsArr: [...state.postsArr, action.payload]
      };
    default:
      return state;
  }
};
