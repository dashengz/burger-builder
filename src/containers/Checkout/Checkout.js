import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = '';
        for (let p of params.entries()) {
            if (p[0] === 'price') price = +p[1];
            else ingredients[p[0]] = +p[1];
        }

        this.state = {
            ingredients: ingredients,
            price: price
        }
    }

    cancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.cancelHandler}
                    checkout={this.checkoutHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData
                        {...props}
                        ingredients={this.state.ingredients}
                        price={this.state.price}/>
                    )} />
            </div>
        );
    }
}

export default Checkout;