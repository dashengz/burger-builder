import React, {Component} from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        purchasable: false,
        purchasing: false
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

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    checkoutHandler = () => {
        // alert('Checkout!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // shouldn't use this in production, as users might manipulate this price via js; should calculate on server
            // dummy data
            customer: {
                name: 'Max',
                address: {
                    street: '42 Test Avenue, Apt 42',
                    zipCode: '41357',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} dismiss={this.cancelPurchaseHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        cancel={this.cancelPurchaseHandler}
                        checkout={this.checkoutHandler}/>
                </Modal>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}/>
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;