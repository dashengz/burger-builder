import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

// The async job made possible by thunk
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        // ... auth user
    };
};