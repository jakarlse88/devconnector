import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload.error;
        default:
            return state;
    }
};
