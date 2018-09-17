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
        return (
            <div>
                {
                    this.props.ingredients ?
                        (
                            <React.Fragment>
                                <CheckoutSummary
                                    ingredients={this.props.ingredients}
                                    cancel={this.cancelHandler}
                                    checkout={this.checkoutHandler}/>
                                <Route
                                    path={this.props.match.path + '/contact-data'}
                                    component={ContactData}/>
                            </React.Fragment>
                        ) : <Redirect to="/"/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);