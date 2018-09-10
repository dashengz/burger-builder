import React from 'react';
import classes from './Order.css';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>
                Ingredients:
                {
                    Object.keys(props.ingredients).map(name => {
                        return (
                            <span
                                key={name}
                                className={classes.Ingredient}>
                                {name} ({props.ingredients[name]})
                            </span>
                        );
                    })
                }
            </p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;