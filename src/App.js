import React, {Component} from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        characters: []
    };

    validationHandler = (event) => {
        this.setState({
            characters: event.target.value.split('').map((c, i) => {
                return {
                    id: i,
                    character: c
                };
            })
        });
    };

    deleteCharHandler = (index) => {
        const newCharacters = [...this.state.characters];
        newCharacters.splice(index, 1);
        this.setState({
            characters: newCharacters
        });
    };

    render() {
        return (
            <div className="App">
                <section className="App-intro">
                    <h3>Wordplay!</h3>
                    <ValidationComponent
                        count={this.state.characters.length}
                        characters={this.state.characters.map(c => c.character).join('')}
                        change={this.validationHandler} />
                </section>
                <section className="App-section">
                    {
                        this.state.characters.map((c, index) => {
                            return (
                                <CharComponent
                                    key={c.id}
                                    click={() => this.deleteCharHandler(index)}
                                    character={c.character} />
                            );
                        })
                    }
                </section>
            </div>
        );
    }
}

export default App;