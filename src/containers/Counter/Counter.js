import React, {Component} from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from "react-redux";

class Counter extends Component {
    state = {
        counter: 0
    };

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => {
                    return {counter: prevState.counter + 1}
                });
                break;
            case 'dec':
                this.setState((prevState) => {
                    return {counter: prevState.counter - 1}
                });
                break;
            case 'add':
                this.setState((prevState) => {
                    return {counter: prevState.counter + value}
                });
                break;
            case 'sub':
                this.setState((prevState) => {
                    return {counter: prevState.counter - value}
                });
                break;
            default:

        }
    };

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')}/>
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)}/>
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter
    }; // ctr becomes available in props
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    }; // onIncrementCounter becomes available in props
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect is a function that returns an hoc
// If we don't have a mapper, just pass null in its place