import React from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
            );
        });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
        </React.Fragment>
    );
};

export default orderSummary;