import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>{props.username}:</p>
            <p><small>Learning react is fun!</small></p>
        </div>
    );
};

export default userOutput;