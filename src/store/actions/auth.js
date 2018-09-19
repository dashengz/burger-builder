import * as actionTypes from './actionTypes';
import axios from "axios";

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
        axios.post(
            // see https://firebase.google.com/docs/reference/rest/auth/ for more endpoints
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBvoYKbktcDCcZjHcE4dFUoghshr9sNU8Y',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        }).catch(err => {
            console.log(err);
            dispatch(authFailed(err));
        });
    };
};