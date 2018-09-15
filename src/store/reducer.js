const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const newState = Object.assign({}, state); // shallow copy
            newState.counter = state.counter + 1;
            return newState;
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            };
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            };
        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({
                    id: new Date().getTime(),
                    value: state.counter
                })
            };
        case 'DELETE_RESULT':
            // Option 1: shallow copy and use splice()
            // ...
            return {
                ...state,
                // Option 2: filter() doesn't mutate original array
                results: state.results.filter(r => r.id !== action.resultElementId)
            };
        default:
    }
    return state;
};

export default reducer;