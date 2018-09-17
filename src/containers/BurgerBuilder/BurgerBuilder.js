import React, {Component} from 'react';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import {BURGER_BASE_PRICE} from "../../constants";

class BurgerBuilder extends Component {
    state = {
        // Local UI states
        purchasing: false,
        loading: false
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
            pathname: '/checkout'
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
                                price={this.props.price}
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
                                price={this.props.price}
                                ingredients={this.props.ingredients}
                                add={this.props.onAddIngredient}
                                remove={this.props.onRemoveIngredient}
                                purchasable={this.props.price > BURGER_BASE_PRICE}
                                order={this.purchaseHandler}/>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        );
    }
}

// Redux-managed states
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));