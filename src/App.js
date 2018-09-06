import React, {Component} from 'react';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import {Redirect, Route, Switch} from "react-router-dom";
import Instructions from "./components/Instructions/Instructions";
import Navigation from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";

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
                    <Route path="/courses" component={Courses}/>
                    {/*<Route path="/courses/:id/:title" exact component={Course}/>*/}
                    {/*<Route path="/courses/:id" exact component={Course}/>*/}
                    <Redirect from="/all-courses" to="/courses"/>
                    <Redirect from="/" exact to="/courses"/>
                    <Route component={NotFound}/>
                </Switch>
                <Instructions show={this.state.showInstructions} toggle={this.toggleInstructionsHandler} />
            </div>
        );
    }
}

export default App;
