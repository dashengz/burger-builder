import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from "react-router-dom";

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                exact={props.exact /* If the parent specifies exact, then it will be applied to this NavLink */}
                activeClassName={classes.active /* Need to specify this, because CSS module created unique class names */}
                to={props.link}>{props.children}</NavLink>
        </li>
    );
};

export default navigationItem;