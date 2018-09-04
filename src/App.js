import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
    render() {
        return (
            // If you serve the app to a sub-domain
            // <BrowserRouter basename="/my-app">...</BrowserRouter>
            // Also, the server needs to be configured to handle 404,
            // redirects to index.html if the page is unknown!

            <BrowserRouter>
                <div className="App">
                    <Blog/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
