import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    let buttonClass = '';
    if (props.showPersons) {
        buttonClass = classes.Red;
    }
    const classNames = [];
    if (props.persons.length < 3) classNames.push(classes.red);
    if (props.persons.length < 2) classNames.push(classes.bold);
    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={classNames.join(' ')}>This is really working!</p>
            <button
                className={buttonClass}
                onClick={props.click}
            >Toggle Persons</button>
        </div>
    );
};

export default cockpit;