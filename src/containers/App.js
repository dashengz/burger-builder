import React, {PureComponent} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';

// Using the Context API
// Use this for global contexts, such as authentication state, theme color, etc.
// But don't overuse this! The normal way of passing state is still valid in most cases
export const AuthContext = React.createContext(false);

class App extends PureComponent {
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
            showPersons: false,
            toggleClicked: 0,
            isAuthenticated: false
        };

        // Exploring lifecycle
        console.log('App - constructor', props);
    }

    // Deprecated
    // componentWillMount() {
    //     console.log('App - componentWillMount()');
    // }

    componentDidMount() {
        console.log('App - componentDidMount()');
    }

    // With PureComponent, React takes care of shouldComponentUpdate for us,
    // It performs shallow checks for the states and props, and returns false if nothing has changed.
    // However, we shouldn't use this all the time,
    // because we might want a component to NOT update even if one prop has changed.

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Update] App - shouldComponentUpdate', nextProps, nextState);
    //     return this.state.persons !== nextState.persons ||
    //         this.state.showPersons !== nextState.showPersons;
    // }

    // Deprecated
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('[Update] App - componentWillUpdate', nextProps, nextState);
    // }

    // Executed after props is updated, and offers a chance to update the state as well
    // We can do something with the props, and return an updated state
    // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('App - getDerivedStateFromProps', nextProps, prevState);
        return {/* Updated state to be merged into the current state */};
    }

    // A use-case might be scrolling list
    // Save the user position here, and scroll back to this point in componentDidUpdate after user clicked on save
    // https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('App - getSnapshotBeforeUpdate', prevProps, prevState);
        return "Got snapshot!"; // or null
    }

    // Get the snapshot here
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Update] App - componentDidUpdate', prevProps, prevState, snapshot);
    }

    loginHandler = () => {
        this.setState({
            isAuthenticated: true
        });
    };

    togglePersonsHandler = () => {
        // setState() is handled asynchronously, so the state is unreliable,
        // if other components are also modifying it

        // If you know that there is another component also changing this state,
        // Then use the below version of setState

        // this.setState({
        //     showPersons: !this.state.showPersons,
        //     toggleClicked: this.state.toggleClicked + 1
        // }); // only the aforementioned property gets changed

        this.setState((prevState, props) => {
            return {
                showPersons: !prevState.showPersons,
                toggleClicked: prevState.toggleClicked + 1
            };
        });
    };

    deletePersonHandler = (id) => {
        // const newPersons = this.state.persons.slice();
        const newPersons = [...this.state.persons]; // spread, and thus creating a copy
        const personIndex = this.state.persons.findIndex(p => p.id === id);
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
            <Auxiliary>
                <button onClick={() => this.setState({showPersons: true})}>Show Persons</button>
                <Cockpit
                    appTitle={this.props.title}
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    click={this.togglePersonsHandler}
                    login={this.loginHandler}
                />
                <AuthContext.Provider value={this.state.isAuthenticated}>
                    {persons}
                </AuthContext.Provider>
            </Auxiliary>
        );
    }
}

export default withClass(App, classes.App);