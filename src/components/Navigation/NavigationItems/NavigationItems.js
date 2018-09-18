import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    // boolean prop can be passed without explicitly saying active={true}
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        </ul>
    );
};

export default navigationItems;