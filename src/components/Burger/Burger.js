import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';
// import {withRouter} from "react-router-dom";

const burger = (props) => {
    // props.ingredients is an object, not an array! So we need to transform it first!
    let ingredients = Object.keys(props.ingredients)
        .map(ingredientName => {
            // Use [...Array(num)] to create [ , , , ] placeholder arrays
            return [...Array(props.ingredients[ingredientName])].map((_, i) => {
                return <BurgerIngredient key={ingredientName + i} type={ingredientName} />;
            });
        })
        .reduce((prev, cur) => prev.concat(cur), []);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// export default withRouter(burger); // If we want to pass the closest router props to this component
export default burger;