import React, {Component} from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        characters: ''
    };

    validationHandler = (event) => {
        this.setState({
            characters: event.target.value
        });
    };

    deleteCharHandler = (index) => {
        const newCharacters = this.state.characters.split('');
        newCharacters.splice(index, 1);
        this.setState({
            characters: newCharacters.join('')
        });
    };

    render() {
        return (
            <div className="App">
                <section className="App-intro">
                    <h3>Wordplay!</h3>
                    <ValidationComponent
                        count={this.state.characters.length}
                        characters={this.state.characters}
                        change={this.validationHandler} />
                </section>
                <section className="App-section">
                    {
                        this.state.characters.split('').map((c, index) => {
                            return (
                                <CharComponent
                                    key={index}
                                    click={() => this.deleteCharHandler(index)}
                                    character={c} />
                            );
                        })
                    }
                </section>
            </div>
        );
    }
}

export default App;