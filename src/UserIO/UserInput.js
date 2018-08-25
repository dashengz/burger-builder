import React from 'react';

const userInput = (props) => {
    const inputStyle = {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '20px',
        border: '2px solid maroon'
    };
    return <input style={inputStyle} type="text" value={props.username} onChange={props.change} />
};

export default userInput;