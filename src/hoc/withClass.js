import React from 'react';

const withClass = (WrappedComponent, classes) => {
    return (props) => {
        return (
            <div className={classes}>
                <WrappedComponent />
            </div>
        );
    };
};

export default withClass;