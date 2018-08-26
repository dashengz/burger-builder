import React from 'react';
import Person from "./Person/Person";

const persons = (props) => props.persons.map((person, index) => {
    return <Person
        click={() => props.click(index)}
        change={event => props.change(event, person.id)}
        name={person.name}
        age={person.age}
        key={person.id /* Unique id so that React can render changes more efficiently */}/>
});

export default persons;