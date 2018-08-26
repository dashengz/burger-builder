import React, {Component} from 'react';
import Person from "./Person/Person";

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('Persons - constructor', props);
    }

    componentWillMount() {
        console.log('Persons - componentWillMount()');
    }

    componentDidMount() {
        console.log('Persons - componentDidMount()');
    }
    render() {
        console.log('Persons - render()');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.click(index)}
                change={event => this.props.change(event, person.id)}
                name={person.name}
                age={person.age}
                key={person.id /* Unique id so that React can render changes more efficiently */}/>
        })
    }
}

export default Persons;