import React from 'react'; // needed for compiling the jsx syntax below

// Use {} to wrap simple javascript calls inside jsx
const person = (props) => {
    return (
        <div>
            {/* Do not have access to setState because it's not a class-based component */}
            {/* Use the click prop (switchNameHandler) that was passed to Person */}
            <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old!</p>
            <small>{props.children}</small>
        </div>
    );
};
// If using class-based components, use this.name and this.age to reference the dynamic values

export default person;