import React, {Component} from 'react'; // needed for compiling the jsx syntax below
import classes from './Person.css';

// Use {} to wrap simple javascript calls inside jsx
class Person extends Component {
    constructor(props) {
        super(props);
        console.log('Person - constructor', props);
    }

    componentWillMount() {
        console.log('Person - componentWillMount()');
    }

    componentDidMount() {
        console.log('Person - componentDidMount()');
    }
    render() {
        console.log('Person - render()');
        return (
            <div className={classes.Person}>
                {/* Use the click prop (switchNameHandler) that was passed to Person */}
                <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
                <p><small>{this.props.children}</small></p>
                <input type="text" onChange={this.props.change} value={this.props.name} />
            </div>
        );
    }
}
// If using class-based components, use this.name and this.age to reference the dynamic values

export default Person;