import React from 'react';
import classes from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} click={props.close} />
            <div className={
                [classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')
            } onClick={props.close}>
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isAuthed={props.isAuthed}/>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;