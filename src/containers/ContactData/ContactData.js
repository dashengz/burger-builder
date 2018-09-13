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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
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
                                Object.keys(this.state.orderForm).map(e => (
                                    <Input
                                        key={e}
                                        elementType={this.state.orderForm[e].elementType}
                                        elementConfig={this.state.orderForm[e].elementConfig}
                                        value={this.state.orderForm[e].value}
                                        change={(event) => this.inputChangeHandler(event, e)}/>
                                ))
                            }
                            <Button type="Success" click={this.orderHandler}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}

export default ContactData;