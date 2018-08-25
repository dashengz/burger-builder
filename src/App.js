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
        otherState: 'Some other value',
        showPersons: false
    };

    togglePersonsHandler = () => {
        this.setState({
            showPersons: !this.state.showPersons
        }); // only the aforementioned property gets changed
    };

    deletePersonHandler = (personIndex) => {
        const newPersons = this.state.persons;
        newPersons.splice(personIndex, 1);
        this.setState({
            persons: newPersons
        });
    };

    changeNameHandler = (event) => {
        this.setState({
            persons: [
                {
                    name: 'Max',
                    age: 28
                },
                {
                    name: event.target.value,
                    age: 29
                },
                {
                    name: 'Stephanie',
                    age: 26
                }
            ]
        });
    };

    render() {
        const buttonStyle = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '2px solid #777',
            padding: '5px 10px',
            cursor: 'pointer'
        };

        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    {
                        this.state.persons.map((person, index) => {
                            return <Person
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age} />
                        })
                    }
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button
                    style={buttonStyle}
                    onClick={this.togglePersonsHandler}
                >Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default App;