import React from 'react'; // needed for compiling the jsx syntax below
import classes from './Person.css'; // although we just imported in Person.js, the style will be global as it's injected into <head>

// Use {} to wrap simple javascript calls inside jsx
const person = (props) => {
    // Simulate an error that you want to catch
    if (Math.random() > 0.7) throw new Error('Something went wrong!');
    return (
        <div className={classes.Person}>
            {/* Do not have access to setState because it's not a class-based component */}
            {/* Use the click prop (switchNameHandler) that was passed to Person */}
            <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
            <p><small>{props.children}</small></p>
            <input type="text" onChange={props.change} value={props.name} />
        </div>
    );
};
// If using class-based components, use this.name and this.age to reference the dynamic values

export default person;