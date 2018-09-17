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
    return (dispatch, getState) => {
        // with the help of react-thunk, we can dispatch asynchronously
        setTimeout(() => {
            // We could access the current state here, and do something with it
            // eg. console.log(getState().ctr.counter);

            // But we shouldn't, because we could also just
            // get the state we want by passing it down from the container,
            // and accepting it as an argument here
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