import { GET_POSTS, POSTS_ERRORS } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case POSTS_ERRORS:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
};

