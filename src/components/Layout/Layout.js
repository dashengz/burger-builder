import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    // We want to control the state of the menu in both Toolbar and SideDrawer
    // We can do that by using the state, thus we need to change Layout to class-based component

    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <SideDrawer show={this.state.showSideDrawer} close={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;