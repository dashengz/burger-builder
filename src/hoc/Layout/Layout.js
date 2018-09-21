import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuthed={this.props.isAuthenticated}
                    click={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuthed={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

// Connect to redux, because we want to adjust the Layout based on auth
const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token, // !== null
    }
};

export default connect(mapStateToProps)(Layout);