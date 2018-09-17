import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    results: []
};

// reducers cannot handle async code!
// need to use action creators
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {
                results: state.results.concat({
                    id: new Date().getTime(),
                    // value: state.counter // not accessible anymore
                    value: action.result // need to switch to using action payload!
                })
            });
        case actionTypes.DELETE_RESULT:
            return updateObject(state, {
                results: state.results.filter(r =>
                    r.id !== action.resultElementId
                )
            });
        default:
    }
    return state;
};

export default reducer;