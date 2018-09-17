import React, {Component} from 'react';
import {connect} from "react-redux";

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions/actions';
import {increment} from "../../store/actions/actions";

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}/>
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {
                        this.props.storedResults.map(r => (
                            <li
                                key={r.id}
                                onClick={() => this.props.onDeleteResult(r.id)}>{r.value}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }; // ctr becomes available in props
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: (value) => dispatch({type: actionTypes.ADD, value: value}),
        onSubtractCounter: (value) => dispatch({type: actionTypes.SUBTRACT, value: value}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElementId: id})
    }; // onIncrementCounter becomes available in props
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect is a function that returns an hoc
// If we don't have a mapper, just pass null in its place