import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.props.onInitPurchase();
        // Too late to modify purchased prop, because the render received the old prop (purchased true)
    }

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

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionCreators.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);