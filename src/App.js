import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from './store/actions/index';
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {
        return (
            <div>
                <Layout>
                    {
                        this.props.isAuthed ?
                            (
                                <Switch>
                                    <Route path="/checkout" component={asyncCheckout}/>
                                    <Route path="/orders" component={asyncOrders}/>
                                    <Route path="/logout" component={Logout}/>
                                    <Route path="/auth" component={asyncAuth}/>
                                    <Route path="/" exact component={BurgerBuilder}/>
                                    <Redirect to="/" />
                                </Switch>
                            ) :
                            (
                                <Switch>
                                    <Route path="/auth" component={asyncAuth}/>
                                    <Route path="/" exact component={BurgerBuilder}/>
                                    <Redirect to="/" />
                                </Switch>
                            )
                    }
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actionCreators.authCheckState())
    }
};

// connect will 'block' router from working
// because we are adding a layer on top
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
