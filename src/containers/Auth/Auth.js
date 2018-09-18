import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import {checkValidity} from "../../utility";

class Auth extends Component {
    state = {
        // local state, as it's just collecting user input for this page
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter a valid email!'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                isTouched: false,
                errorMessage: 'Please enter a password (at least 6 characters)!'
            }
        }
    };

    inputChangeHandler = (event, controlName) => {
        // need to deep clone the objects that we would change
        // so that we don't modify the original state
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                isTouched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

    render() {
        return (
            <div className={classes.Auth}>
                <form>
                    {
                        Object.keys(this.state.controls).map(e => {
                            const element = this.state.controls[e];
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
                    <Button type="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;