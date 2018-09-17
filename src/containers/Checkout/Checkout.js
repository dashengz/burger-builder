import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

    cancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return this.props.ingredients ?
            (
                <div>
                    {this.props.purchased ? <Redirect to="/"/> : null}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancel={this.cancelHandler}
                        checkout={this.checkoutHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            ) : <Redirect to="/"/>
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);