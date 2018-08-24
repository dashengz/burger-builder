import React from 'react'; // needed for compiling the jsx syntax below

// Use {} to wrap simple javascript calls inside jsx
const person = () => {
    return <p>I'm a Person and I'm {Math.ceil(Math.random() * 100)} years old!</p>
};

export default person;