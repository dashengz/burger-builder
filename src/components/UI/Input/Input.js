import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [
        classes.InputElement
    ];
    if (props.invalid) inputClasses.push(classes.Invalid);
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}/>;
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}/>;
            break;
            // dropdown, select, etc.
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.change}>
                    {
                        props.elementConfig.options.map(o => (
                            <option key={o.value} value={o.value}>
                                {o.displayValue}
                            </option>
                        ))
                    }
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig}
                onChange={props.change}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;