import * as actionTypes from './actionTypes';
import axios from "axios";
import {AUTH_SIGN_IN, AUTH_SIGN_UP} from "../../shared/constants";

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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresAt');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expiresIn => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
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
            // utilize localStorage
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expiresAt', new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            ));
            // idToken -> token, localId -> userId
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            // expiresIn
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(err => {
            console.log(err);
            // axios wraps the error, so in order to retrieve it
            // we need to use err.response.data.error
            // https://github.com/axios/axios#handling-errors
            dispatch(authFailed(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const now = new Date();
            const expiresAt = new Date(localStorage.getItem('expiresAt'));
            if (expiresAt <= now) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expiresAt.getTime() - now.getTime()) / 1000));
            }
        }
    }
};