import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

describe('auth reducer', () => {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should store the token upon login', function () {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'token',
            userId: 'userId'
        })).toEqual(updateObject(initialState, {
            token: 'token',
            userId: 'userId'
        }))
    });
});