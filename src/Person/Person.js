import React from 'react'; // needed for compiling the jsx syntax below
import Radium from 'radium';
import './Person.css'; // although we just imported in Person.js, the style will be global as it's injected into <head>

// Use {} to wrap simple javascript calls inside jsx
const person = (props) => {
    const style = {
        '@media (min-width:500px)': {
            width: '450px'
        }
    };
    return (
        <div className="Person" style={style}>
            {/* Do not have access to setState because it's not a class-based component */}
            {/* Use the click prop (switchNameHandler) that was passed to Person */}
            <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
            <p><small>{props.children}</small></p>
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
};
// If using class-based components, use this.name and this.age to reference the dynamic values

export default Radium(person);