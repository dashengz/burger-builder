import React, {Component} from 'react';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";

const BURGER_BASE_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        totalPrice: BURGER_BASE_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        // Commented out until we learn how to handle async with redux

        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: 'Ingredients Failed to load!'
        //         });
        //     });
    }

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
        this.props.history.push({
            pathname: '/checkout',
            // Build query params
            search: '?' +
                Object.keys(this.state.ingredients).map(i => i + '=' + this.state.ingredients[i]).join('&') +
                '&price=' + this.state.totalPrice
        });
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    dismiss={this.cancelPurchaseHandler}>
                    {
                        this.state.loading || !this.props.ingredients ?
                            <Spinner/> :
                            <OrderSummary
                                price={this.state.totalPrice}
                                ingredients={this.props.ingredients}
                                cancel={this.cancelPurchaseHandler}
                                checkout={this.checkoutHandler}/>
                    }
                </Modal>
                {
                    !this.props.ingredients ?
                        this.state.error ? <p style={{
                            textAlign: 'center'
                        }}>{this.state.error}</p> : <Spinner/> : (
                        <React.Fragment>
                            <Burger ingredients={this.props.ingredients}/>
                            <BuildControls
                                price={this.state.totalPrice}
                                ingredients={this.props.ingredients}
                                add={this.props.onAddIngredient}
                                remove={this.props.onRemoveIngredient}
                                purchasable={this.state.purchasable}
                                order={this.purchaseHandler}/>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onRemoveIngredient: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));