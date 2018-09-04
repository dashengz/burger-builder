import React, {Component} from 'react';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import {Redirect, Route, Switch} from "react-router-dom";
import Instructions from "./components/Instructions/Instructions";
import Navigation from "./components/Navigation/Navigation";

class App extends Component {
    state = {
        showInstructions: true
    };

    toggleInstructionsHandler = () => {
        this.setState(prevState => {
            return {
                showInstructions: !prevState.showInstructions
            }
        });
    };

    render() {
        return (
            <div className="App">
                <Navigation />
                <Switch>
                    <Route path="/users" exact component={Users}/>
                    <Route path="/courses" exact component={Courses}/>
                    <Redirect to="/courses"/>
                </Switch>
                <Instructions show={this.state.showInstructions} toggle={this.toggleInstructionsHandler} />
            </div>
        );
    }
}

export default App;
