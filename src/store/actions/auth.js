import * as actionTypes from './actionTypes';
import axios from "axios";
import {AUTH_SIGN_IN, AUTH_SIGN_UP} from "../../constants";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

// The async job made possible by thunk
export const auth = (email, password, method = AUTH_SIGN_UP) => {
    return dispatch => {
        dispatch(authStart());
        // ... auth user
        let authUrl = '';
        switch (method) {
            case AUTH_SIGN_UP:
                authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBvoYKbktcDCcZjHcE4dFUoghshr9sNU8Y';
                break;
            case AUTH_SIGN_IN:
                authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBvoYKbktcDCcZjHcE4dFUoghshr9sNU8Y';
                break;
            default:
                throw Error('Unsupported action!');
        }
        axios.post(
            // see https://firebase.google.com/docs/reference/rest/auth/ for more endpoints
            authUrl, {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).then(response => {
            console.log(response);
            // idToken -> token, localId -> userId
            dispatch(authSuccess(
                response.data.idToken,
                response.data.localId));
        }).catch(err => {
            console.log(err);
            dispatch(authFailed(err));
        });
    };
};