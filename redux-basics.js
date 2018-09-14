// Redux: state management module

// Redux can be used as a standalone module, it's not dependent on react
// import {...} from ...; // when used with React

// Use nodejs to explore the basics of redux
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}; // doesn't have to be a js object; can be number, string, etc.

// Reducer: a function
// multiple reducers will be merged into one
// should not have side-effects, must be synchronous
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INC_COUNTER':
            return {
                ...state,
                counter: state.counter + 1
            }; // must update state immutably
        case 'ADD_COUNTER':
            return {
                ...state,
                counter: state.counter + action.value
            }; // must update state immutably
    }
    return state;
};

// Store
const store = createStore(rootReducer);

console.log(store.getState()); // will be printed to console if we run 'node redux-basics.js'

// Dispatching Action
store.dispatch({
    type: 'INC_COUNTER' // 'type' must be specified; ALL CAPS is the convention
});
store.dispatch({
    type: 'ADD_COUNTER',
    value: 10 // Additional payload; can be anything you want: js objects, string, number, ...
});
console.log(store.getState());

// Subscription