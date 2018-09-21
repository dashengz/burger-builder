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
import {BURGER_BASE_PRICE} from "../../shared/constants";

class BurgerBuilder extends Component {
    state = {
        // Local UI states
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthed) {
            this.setState({
                purchasing: true
            });
        } else {
            // If not authed, then remember the action,
            // so that when the user finished signing up,
            // the Auth page can be redirected to /checkout, and not /
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    checkoutHandler = () => {
        // before going to the checkout page,
        // initialize the purchase (set purchased to false)
        this.props.onInitPurchase();
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
                        this.props.error ? <p style={{
                            textAlign: 'center'
                        }}>{this.props.error}</p> : <Spinner/> : (
                        <React.Fragment>
                            <Burger ingredients={this.props.ingredients}/>
                            <BuildControls
                                isAuthed={this.props.isAuthed}
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
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthed: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

// Strip out redux and export BurgerBuilder as a named-export, so that we can unit test it
export {BurgerBuilder};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));