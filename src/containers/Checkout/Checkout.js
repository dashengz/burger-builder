import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        }
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let p of params.entries()) {
            ingredients[p[0]] = +p[1];
        }
        this.setState({
            ingredients: ingredients
        });
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
            </div>
        );
    }
}

export default Checkout;