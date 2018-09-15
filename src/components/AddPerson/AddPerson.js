import React, {Component} from 'react';
import './AddPerson.css';

class AddPerson extends Component {
    // This state doesn't need to be part of redux state
    // local UI state
    // The entire persons list is still part of redux state
    state = {
        name: '',
        age: 0
    };

    onNameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    onAgeChangeHandler = (event) => {
        this.setState({
            age: event.target.value
        });
    };

    render() {
        return (
            <div className="AddPerson">
                <input
                    type="text"
                    onChange={this.onNameChangeHandler}
                    placeholder="Enter a Name"/>
                <input
                    type="number"
                    onChange={this.onAgeChangeHandler}
                    placeholder="Enter an Age"/>
                <button
                    onClick={() => this.props.personAdded({
                        name: this.state.name,
                        age: this.state.age
                    })}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;