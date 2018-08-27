import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    let buttonClass = classes.Button;
    if (props.showPersons) {
        buttonClass = [classes.Button, classes.Red].join(' ');
    }
    const classNames = [];
    if (props.persons.length < 3) classNames.push(classes.red);
    if (props.persons.length < 2) classNames.push(classes.bold);
    return (
        <React.Fragment>
            <h1>{props.appTitle}</h1>
            <p className={classNames.join(' ')}>This is really working!</p>
            <button
                className={buttonClass}
                onClick={props.click}
            >Toggle Persons</button>
            <button
                className={classes.Button}
                onClick={props.login}
            >Log In</button>
        </React.Fragment>
    );

    // Array of element: valid in React 16+
    // return [
    //     <h1 key="1">{props.appTitle}</h1>,
    //     <p key="2" className={classNames.join(' ')}>This is really working!</p>,
    //     <button
    //         key="3"
    //         className={buttonClass}
    //         onClick={props.click}
    //     >Toggle Persons</button>
    // ];
};

export default cockpit;