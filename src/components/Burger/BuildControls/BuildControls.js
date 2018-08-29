import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = [
        {
            label: 'Salad',
            type: 'salad'
        },
        {
            label: 'Bacon',
            type: 'bacon'
        },
        {
            label: 'Cheese',
            type: 'cheese'
        },
        {
            label: 'Meat',
            type: 'meat'
        }
    ];
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    disable={props.ingredients[control.type] < 1}
                    add={() => props.add(control.type)}
                    remove={() => props.remove(control.type)}/>
            ))}
        </div>
    );
};

export default buildControls;