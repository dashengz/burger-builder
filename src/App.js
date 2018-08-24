import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    // the state property is inherited from Component, thus not exists in function-based components
    // if the state changes, the corresponding component will be re-rendered
    state = {
        persons: [
            {
                name: 'Max',
                age: 28
            },
            {
                name: 'Manu',
                age: 29
            },
            {
                name: 'Stephanie',
                age: 26
            }
        ],
        otherState: 'Some other value'
    };

    // naming convention: handler, if we don't call it ourselves, but used it with event listeners
    switchNameHandler = () => {
        // console.log('Was Clicked!');
        // Don't directly try to modify state like this: this.state.person[0].name = 'Maximilian';
        // this.setState is inherited from Component class
        // pass in a partial state, in this case, since otherState is not changed, it won't be erased from the state
        this.setState({
            persons: [
                {
                    name: 'Maximilian',
                    age: 28
                },
                {
                    name: 'Manu',
                    age: 29
                },
                {
                    name: 'Stephanie',
                    age: 27
                }
            ]
        });
    };

    render() {
        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button onClick={this.switchNameHandler}>Switch Name</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
                <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobby: Racing</Person>
                <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
            </div>
        );
    }
}

export default App;