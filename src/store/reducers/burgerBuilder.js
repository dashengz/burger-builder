import * as actionTypes from '../actions/actionTypes';
import {BURGER_BASE_PRICE, ERROR_FETCH_INGREDIENTS_FAILED, INGREDIENT_PRICES} from "../../constants";
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: BURGER_BASE_PRICE,
    error: null
};

const modifyIngredient = (state, action, modifier = 1) => {
    return updateObject(state, {
        ingredients: updateObject(state.ingredients, {
            [action.ingredientName]: state.ingredients[action.ingredientName] + modifier
        }),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] * modifier
    });
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: [
            'salad', 'bacon', 'cheese', 'meat'
        ].reduce((prev, cur) => {
            return {...prev, [cur]: action.ingredients[cur]};
        }, {}),
        totalPrice: BURGER_BASE_PRICE, // revert to initial price
        error: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return modifyIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return modifyIngredient(state, action, -1);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: ERROR_FETCH_INGREDIENTS_FAILED});
        default:
            return state;
    }
};

export default reducer;