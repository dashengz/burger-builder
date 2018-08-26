import React, {Component} from 'react';
import classes from './App.css';
import Person from './Person/Person';

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
        let buttonClass = '';
        if (this.state.showPersons) {
            persons = (
                <div>
                    {
                        this.state.persons.map((person, index) => {
                            return <Person
                                click={() => this.deletePersonHandler(index)}
                                change={event => this.changeNameHandler(event, person.id)}
                                name={person.name}
                                age={person.age}
                                key={person.id /* Unique id so that React can render changes more efficiently */}/>
                        })
                    }
                </div>
            );
            buttonClass = classes.Red;
        }

        const classNames = [];
        if (this.state.persons.length < 3) classNames.push(classes.red);
        if (this.state.persons.length < 2) classNames.push(classes.bold);

        return (
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={classNames.join(' ')}>This is really working!</p>
                <button
                    className={buttonClass}
                    onClick={this.togglePersonsHandler}
                >Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default App;