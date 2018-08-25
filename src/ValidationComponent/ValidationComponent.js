import React from 'react';

const validationComponent = (props) => {
    let validationText = null;
    if (props.count >= 5) {
        validationText = <span style={{color: 'green'}}>Input valid!</span>;
    } else {
        validationText = <span style={{color: 'red'}}>Input too short!</span>;
    }
    return (
        <div>
            <input
                style={{
                    padding: '12px',
                    fontSize: '20px'
                }}
                type="text"
                placeholder="Enter at least 5 characters"
                value={props.characters}
                onChange={props.change}/>
            <p><small>Character count: {props.count}</small></p>
            <p><small>{validationText}</small></p>
        </div>
    );
};

export default validationComponent;