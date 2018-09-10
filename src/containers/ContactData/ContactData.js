import React, {Component} from 'react';
import axios from '../../axios-orders';

import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            price: this.props.price, // dummy data
            customer: {
                name: 'Max',
                address: {
                    street: '42 Test Avenue, Apt 42',
                    zipCode: '41357',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {
                    this.state.loading ? <Spinner /> :
                        <form>
                            <input type="text" name="name" placeholder="Your Name" />
                            <input type="email" name="email" placeholder="Your Email" />
                            <input type="text" name="street" placeholder="Street Address" />
                            <input type="text" name="postal" placeholder="Postal Code" />
                            <Button type="Success" click={this.orderHandler}>ORDER</Button>
                        </form>
                }
            </div>
        );
    }
}

export default ContactData;