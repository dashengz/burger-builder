import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const BURGER_BASE_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: BURGER_BASE_PRICE
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]++;
        const updateTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updateTotalPrice
        });
    };

    removeIngredientHandler = (type) => {

    };

    render() {
        return (
            <React.Fragment>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>
                    <BuildControls
                        add={this.addIngredientHandler} />
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;