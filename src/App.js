import React, {Component} from 'react';
import './App.css';
import UserInput from './UserIO/UserInput';
import UserOutput from './UserIO/UserOutput';

class App extends Component {
    state = {
        users: [
            { username: 'Ninja' },
            { username: 'Fireball' },
            { username: 'Flurry' }
        ]
    };

    usernameChangeHandler = (event) => {
        this.setState({
            users: [
                { username: event.target.value },
                { username: 'Fireball' },
                { username: 'Flurry' }
            ]
        });
    };

    render() {
        return (
            <div className="App">
                <section className="App-intro">
                    <p>Enter your username:</p>
                    <UserInput change={this.usernameChangeHandler} username={this.state.users[0].username} />
                </section>
                <section className="App-section">
                    <UserOutput username={this.state.users[0].username} />
                    <UserOutput username={this.state.users[1].username} />
                    <UserOutput username={this.state.users[2].username} />
                </section>
            </div>
        );
    }
}

export default App;
