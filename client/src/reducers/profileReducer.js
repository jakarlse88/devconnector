import {
    CLEAR_CURRENT_PROFILE,
    GET_PROFILE,
    GET_PROFILES_ARR,
    PROFILE_LOADING
} from '../actions/types';

const initialState = {
    profile: null,
    profilesArr: null,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        case GET_PROFILES_ARR:
            return {
                ...state,
                profilesArr: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
