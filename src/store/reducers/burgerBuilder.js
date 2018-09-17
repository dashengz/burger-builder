import * as actionTypes from '../actions/actionTypes';
import {BURGER_BASE_PRICE, INGREDIENT_PRICES} from "../../constants";

const initialState = {
    ingredients: {
        // explicitly set until we learn how to handle async with redux
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: BURGER_BASE_PRICE
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;