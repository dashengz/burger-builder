import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    constructor(props) { // overriding default constructor
        super(props); // must call super
        // for older version of create-react-app setup, es6+ syntax not yet supported,
        // thus some tutorials create state right here in the constructor:
        this.state = {
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

        // Exploring lifecycle
        console.log('App - constructor', props);
    }

    componentWillMount() {
        console.log('App - componentWillMount()');
    }

    componentDidMount() {
        console.log('App - componentDidMount()');
    }

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
        console.log('App - render()');
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
                    appTitle={this.props.title}
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