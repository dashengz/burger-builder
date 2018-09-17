export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
    return {
        type: INCREMENT
    }
};

export const decrement = () => {
    return {
        type: DECREMENT
    }
};

export const add = (value) => {
    return {
        type: ADD,
        value: value
    }
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        value: value
    }
};

const save = result => {
    return {
        type: STORE_RESULT,
        result: result
    }
};

// utility step to run async code
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