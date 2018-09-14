import React, {Component} from 'react';
import axios from '../../axios-orders';

import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

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
                    required: true
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
                value: ''
            }
        },
        loading: false
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) return isValid;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            // shouldn't use this in production
            // users might manipulate this price via js; should calculate on server
            price: this.props.price,
            orderData: Object.keys(this.state.orderForm)
                .reduce((prev, cur) => ({
                    ...prev,
                    [cur]: this.state.orderForm[cur].value
                }), {})
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    };

    inputChangeHandler = (event, id) => {
        // need to deep clone the objects that we would change
        // so that we don't modify the original state
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...updatedOrderForm[id]};
        updatedElement.value = event.target.value;
        // check validity
        updatedElement.isValid = this.checkValidity(event.target.value, updatedElement.validation);
        // register touched
        updatedElement.isTouched = true;
        updatedOrderForm[id] = updatedElement;
        this.setState({
            orderForm: updatedOrderForm
        });
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {
                    this.state.loading ? <Spinner /> :
                        <form>
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
                            <Button type="Success" click={this.orderHandler}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}

export default ContactData;