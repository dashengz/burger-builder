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