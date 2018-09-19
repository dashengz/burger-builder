import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    // boolean prop can be passed without explicitly saying active={true}
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {
                // we could convert this into class-based, but this wouldn't make sense in terms of project structure
                // thus we would need to get isAuthed from above -> Layout container
                !props.isAuthed ?
                    <NavigationItem link="/auth">Authenticate</NavigationItem> :
                    <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    );
};

export default navigationItems;