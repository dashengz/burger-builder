import React, {PureComponent} from 'react';
import Person from "./Person/Person";

class Persons extends PureComponent {
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

    componentWillReceiveProps(nextProps) {
        console.log('[Update] Persons - componentWillReceiveProps', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Update] Persons - shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons;
    //     // Not required for every component!
    //     // If the component receives a lot of props,
    //     // but we only want to re-render the component if one of the prop is changed,
    //     // Then, shouldComponentUpdate() is useful, as we can check that specific prop change,
    //     // and stop the render process to save performance.
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[Update] Persons - componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[Update] Persons - componentDidUpdate()');
    }

    componentWillUnmount() {
        console.log('[Unmount] Persons - componentWillUnmount()');
    }

    render() {
        console.log('Persons - render()');
        // React 16+: returning an array of elements is valid
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