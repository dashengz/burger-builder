import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import {checkValidity} from "../../shared/utility";
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux";
import {AUTH_SIGN_IN, AUTH_SIGN_UP} from "../../shared/constants";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {updateObject} from "../../store/utility";

class Auth extends Component {
    state = {
        // local state, as it's just collecting user input for this page
        isSignUp: true,
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

    componentDidMount() {
        // Trying to go to checkout, even tho not building a burger
        // Catches the case when
        // the user goes to signup page after 'Sign up to order' but not finishing the sign up process
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangeHandler = (event, controlName) => {
        // need to deep clone the objects that we would change
        // so that we don't modify the original state
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                isTouched: true
            })
        });

        this.setState({
            controls: updatedControls
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp ? AUTH_SIGN_UP : AUTH_SIGN_IN
        );
    };

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    };

    render() {
        return (
            <div className={classes.Auth}>
                {this.props.isAuthed ? <Redirect to={this.props.authRedirectPath}/> : null}
                {
                    // make use of firebase's error message
                    // use switch to customize error messages
                    // https://firebase.google.com/docs/reference/rest/auth
                    this.props.error ? (<p style={{
                        color: 'red'
                    }}>{this.props.error.message}</p>) : null
                }
                <form onSubmit={this.submitHandler}>
                    {
                        this.props.loading ? <Spinner/> :
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
                    <Button
                        accent="Success"
                        type="submit">SUBMIT</Button>
                    <Button
                        accent="Danger"
                        click={this.switchModeHandler}>SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthed: !!state.auth.token,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actionCreators.auth(email, password, method)),
        onSetAuthRedirectPath: path => dispatch(actionCreators.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);