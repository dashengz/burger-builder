import React from 'react'; // needed for compiling the jsx syntax below

// Use {} to wrap simple javascript calls inside jsx
const person = (props) => {
    return <p>I'm {props.name} and I'm {props.age} years old!</p>
};
// If using class-based components, use this.name and this.age to reference the dynamic values

export default person;