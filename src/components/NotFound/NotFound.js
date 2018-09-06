import React from 'react';

const notFound = (props) => {
    return (
        <div>
            <h1 style={{color: 'red', textAlign: 'center'}}>{props.type || 'Page'} Not Found!</h1>
            <p>The page({props.location.pathname}) you are trying to access is not found.</p>
        </div>
    );
};

export default notFound;