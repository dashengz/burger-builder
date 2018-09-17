import * as actionTypes from '../actions/actionTypes';
import {BURGER_BASE_PRICE, ERROR_FETCH_INGREDIENTS_FAILED, INGREDIENT_PRICES} from "../../constants";

const initialState = {
    ingredients: null,
    totalPrice: BURGER_BASE_PRICE,
    error: null
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
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    // One option to keep the order of the ingredients
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                    // We could also configure this in firebase, eg. storing the order as a property, etc.
                },
                totalPrice: BURGER_BASE_PRICE, // revert to initial price
                error: null
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: ERROR_FETCH_INGREDIENTS_FAILED
            };
        default:
            return state;
    }
};

export default reducer;