import axios from 'axios';
import { setAlert } from "./alert";
import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                // fetch this data from backend
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Create', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    // fetch this data from backend
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Add Experience', 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    // fetch this data from backend
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Add Education', 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    // fetch this data from backend
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};

// delete experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience removed", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    // fetch this data from backend
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};

// delete education
export const deleteEducation = (id) => async dispatch => {
    console.log(id);
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education removed", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            dispatch({
                type: UPDATE_PROFILE,
                payload: {
                    // fetch this data from backend
                    msg: err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }
};