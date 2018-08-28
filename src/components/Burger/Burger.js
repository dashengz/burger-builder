import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
    // props.ingredients is an object, not an array! So we need to transform it first!
    const ingredients = Object.keys(props.ingredients)
        .map(ingredientName => {
            // Use [...Array(num)] to create [ , , , ] placeholder arrays
            return [...Array(props.ingredients[ingredientName])].map((_, i) => {
                return <BurgerIngredient key={ingredientName + i} type={ingredientName} />;
            });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;