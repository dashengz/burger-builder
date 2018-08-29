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
        totalPrice: BURGER_BASE_PRICE,
        purchasable: false
    };

    addIngredientHandler = (type, remove) => {
        this.setState(prevState => {
            const updatedIngredients = {...prevState.ingredients};
            updatedIngredients[type] = updatedIngredients[type] + (remove ? -1 : 1);
            const updateTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[type] * (remove ? -1 : 1);
            return {
                ingredients: updatedIngredients,
                totalPrice: updateTotalPrice
            }
        });
        this.updatePurchaseStatusHandler();
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] < 1) return;
        this.addIngredientHandler(type, true);
    };

    updatePurchaseStatusHandler = () => {
        this.setState(prevState => {
            return {
                purchasable: prevState.totalPrice > BURGER_BASE_PRICE
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}/>
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;