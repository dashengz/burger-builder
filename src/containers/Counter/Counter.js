import React, {Component} from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from "react-redux";

class Counter extends Component {

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
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}/>
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}/>
                <hr/>
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {
                        this.props.storedResults.map(r => (
                            <li
                                key={r.id}
                                onClick={this.props.onDeleteResult}>{r.value}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storedResults: state.results
    }; // ctr becomes available in props
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: (value) => dispatch({type: 'ADD', value: value}),
        onSubtractCounter: (value) => dispatch({type: 'SUBTRACT', value: value}),
        onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
        onDeleteResult: () => dispatch({type: 'DELETE_RESULT'})
    }; // onIncrementCounter becomes available in props
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect is a function that returns an hoc
// If we don't have a mapper, just pass null in its place