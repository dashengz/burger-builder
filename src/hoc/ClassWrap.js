import React from 'react';

const classWrap = (props) => {
    return (
        <div className={props.classes}>
            {props.children}
        </div>
    );
};

export default classWrap;