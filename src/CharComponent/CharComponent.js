import React from 'react';
import './CharComponent.css';

const charComponent = (props) => {
    return (
        <div className="CharComponent">
            <button
                type="button"
                onClick={props.click}>{props.character}</button>
        </div>
    );
};

export default charComponent;