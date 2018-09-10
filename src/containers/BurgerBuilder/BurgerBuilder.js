import React, {Component} from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BURGER_BASE_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: BURGER_BASE_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: 'Ingredients Failed to load!'
                });
            });
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
        // alert('Checkout!');
        // this.setState({
        //     loading: true
        // });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice, // shouldn't use this in production, as users might manipulate this price via js; should calculate on server
        //     // dummy data
        //     customer: {
        //         name: 'Max',
        //         address: {
        //             street: '42 Test Avenue, Apt 42',
        //             zipCode: '41357',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     });

        this.props.history.push({
            pathname: '/checkout',
            // Build query params
            search: '?' + Object.keys(this.state.ingredients).map(i => i + '=' + this.state.ingredients[i]).join('&')
        });
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    dismiss={this.cancelPurchaseHandler}>
                    {
                        this.state.loading || !this.state.ingredients ?
                            <Spinner/> :
                            <OrderSummary
                                price={this.state.totalPrice}
                                ingredients={this.state.ingredients}
                                cancel={this.cancelPurchaseHandler}
                                checkout={this.checkoutHandler}/>
                    }
                </Modal>
                {
                    !this.state.ingredients ?
                        this.state.error ? <p style={{
                            textAlign: 'center'
                        }}>{this.state.error}</p> : <Spinner/> : (
                        <React.Fragment>
                            <Burger ingredients={this.state.ingredients}/>
                            <BuildControls
                                price={this.state.totalPrice}
                                ingredients={this.state.ingredients}
                                add={this.addIngredientHandler}
                                remove={this.removeIngredientHandler}
                                purchasable={this.state.purchasable}
                                order={this.purchaseHandler}/>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);