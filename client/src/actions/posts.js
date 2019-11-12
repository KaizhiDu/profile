import axios from 'axios';
import { GET_POSTS, POSTS_ERRORS } from './types';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POSTS_ERRORS
        });
    }

};