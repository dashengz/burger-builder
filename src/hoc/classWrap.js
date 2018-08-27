import React from 'react';

const classWrap = (WrappedComponent, classes) => {
    return (props) => {
        return (
            <div className={classes}>
                <WrappedComponent />
            </div>
        );
    };
};

export default classWrap;