import {DELETE_RESULT, STORE_RESULT} from "./actionTypes";

const save = result => {
    return {
        type: STORE_RESULT,
        result: result
    }
};

// utility step to run async code
// thunk will block this async action, and dispatch the actual sync action
export const storeResult = (result) => {
    return dispatch => {
        // with the help of react-thunk, we can dispatch asynchronously
        setTimeout(() => {
            dispatch(save(result));
        }, 2000);
    };
};

export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        resultElementId: id
    }
};