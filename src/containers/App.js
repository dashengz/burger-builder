import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    // the state property is inherited from Component, thus not exists in function-based components
    // if the state changes, the corresponding component will be re-rendered
    state = {
        persons: [
            {
                id: 1,
                name: 'Max',
                age: 28
            },
            {
                id: 2,
                name: 'Manu',
                age: 29
            },
            {
                id: 3,
                name: 'Stephanie',
                age: 26
            }
        ],
        otherState: 'Some other value',
        showPersons: false
    };

    togglePersonsHandler = () => {
        this.setState({
            showPersons: !this.state.showPersons
        }); // only the aforementioned property gets changed
    };

    deletePersonHandler = (personIndex) => {
        // const newPersons = this.state.persons.slice();
        const newPersons = [...this.state.persons]; // spread, and thus creating a copy
        newPersons.splice(personIndex, 1);
        this.setState({
            persons: newPersons
        });
    };

    changeNameHandler = (event, id) => {
        // Find the clicked person object
        const personIndex = this.state.persons.findIndex(p => p.id === id);
        // Make sure we don't directly modify the original state
        const person = {...this.state.persons[personIndex]}; // Object.assign({}, this.state.persons[personIndex])
        // Update the name property of the clicked person object
        person.name = event.target.value;
        // Make sure we don't directly modify the original state
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons
        });
    };

    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                click={this.deletePersonHandler}
                change={this.changeNameHandler}
            />;
        }
        return (
            <div className={classes.App}>
                <Cockpit
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    click={this.togglePersonsHandler}
                />
                {persons}
            </div>
        );
    }
}

export default App;