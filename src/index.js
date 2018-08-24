import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Component (Template)
function Person(props) {
    // Use className to avoid conflict with class keyword
    return (
        <div className="person">
            <h1>{props.name}</h1>
            <p>Your Age: {props.age}</p>
        </div>
    );
    // The jsx syntax above will be compiled to: (another way to create components)
    // return React.createElement(
    //     'div',
    //     {className: 'person'},
    //     React.createElement('h1', null, props.name),
    //     React.createElement('p', null, 'Your Age: ' + props.age)
    // );
}

// Wrapped with () so that we can write multiple lines
// Pass properties to our Person template
var app = (
    <div>
        <Person name="Max" age="28" />
        <Person name="Manu" age="29" />
    </div>
);

ReactDOM.render(app, document.getElementById('root')); // Render app to a single root div (single-page application; recommended)
registerServiceWorker();
