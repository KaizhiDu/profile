import { GET_PROFILE, PROFILE_ERROR, PROFILE_CLEAR, UPDATE_PROFILE } from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case PROFILE_CLEAR:
            return {
                ...state,
                profile: null,
                profiles: [],
                loading: false
            };
        default:
            return state;
    }
}