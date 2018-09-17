import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    results: []
};

const storeResult = (state, action) => {
    return state.results.concat({
        id: new Date().getTime(),
        // value: state.counter // not accessible anymore
        value: action.result // need to switch to using action payload!
    });
};

const deleteResult = (state, action) => {
    return state.results.filter(r =>
        r.id !== action.resultElementId
    )
};

// reducers cannot handle async code!
// need to use action creators
const reducer = (state = initialState, action) => {
    // Create a leaner switch statement helps you see clearly what cases you handle
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: storeResult(state, action)});
        case actionTypes.DELETE_RESULT:
            return updateObject(state, {results: deleteResult(state, action)});
        default:
    }
    return state;
};

export default reducer;