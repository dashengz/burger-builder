import React, {Component} from 'react'; // needed for compiling the jsx syntax below
import PropTypes from 'prop-types';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Auxiliary from '../../../hoc/Auxiliary';

// Use {} to wrap simple javascript calls inside jsx
class Person extends Component {
    constructor(props) {
        super(props);
        console.log('Person - constructor', props);
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('Person - componentWillMount()');
    }

    componentDidMount() {
        console.log('Person - componentDidMount()');
        if (this.props.position === 0) this.inputElement.current.focus(); // inputElement is available because render() is called before componentDidMount
    }

    componentDidUpdate() {
        console.log('[Update] Person - componentDidUpdate()');
        if (this.props.position === 0) this.inputElement.current.focus(); // inputElement is available because render() is called before componentDidMount
    }

    focus() {
        this.inputElement.current.focus();
    }

    componentWillUnmount() {
        console.log('[Unmount] Person - componentWillUnmount()');
    }

    render() {
        console.log('Person - render()');
        return (
            <Auxiliary>
                {/* Use the click prop (switchNameHandler) that was passed to Person */}
                <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
                <p><small>{this.props.children}</small></p>
                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.change}
                    value={this.props.name} />
            </Auxiliary>
        );
    }
}
// If using class-based components, use this.name and this.age to reference the dynamic values

// For class-based components, we can define PropTypes:
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func,
    position: PropTypes.number
};

export default withClass(Person, classes.Person);