import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from '../../../store/actions/index';
import {checkValidity} from "../../../shared/utility";
import {updateObject} from "../../../store/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter your name!'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter your valid address!'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter a five-digit zip code!'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter your country name!'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter a valid e-mail!'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest'
            }
        },
        isValidForm: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        // We will move loading state to redux too

        const order = {
            ingredients: this.props.ingredients,
            // shouldn't use this in production
            // users might manipulate this price via js; should calculate on server
            price: this.props.price,
            orderData: Object.keys(this.state.orderForm)
                .reduce((prev, cur) => ({
                    ...prev,
                    [cur]: this.state.orderForm[cur].value
                }), {}),
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangeHandler = (event, id) => {
        // need to deep clone the objects that we would change
        // so that we don't modify the original state
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [id]: updateObject(this.state.orderForm[id], {
                value: event.target.value,
                isValid: checkValidity(event.target.value, this.state.orderForm[id].validation),
                isTouched: true
            })
        });
        this.setState({
            orderForm: updatedOrderForm,
            // set overall form validity
            isValidForm: Object.keys(updatedOrderForm).reduce((prev, cur) =>
                updatedOrderForm[cur].isValid !== false && prev,
                true)
        });
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {
                    this.props.loading ? <Spinner /> :
                        <form onSubmit={this.orderHandler}>
                            {
                                Object.keys(this.state.orderForm).map(e => {
                                    const element = this.state.orderForm[e];
                                    return (
                                        <Input
                                            key={e}
                                            elementType={element.elementType}
                                            elementConfig={element.elementConfig}
                                            value={element.value}
                                            invalid={element.isValid === false}
                                            touched={element.isTouched}
                                            errorMessage={element.errorMessage}
                                            change={(event) => this.inputChangeHandler(event, e)}/>
                                    );
                                })
                            }
                            <Button
                                accent="Success"
                                type="submit"
                                disabled={!this.state.isValidForm}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));