import React, { Component } from 'react';

class Course extends Component {
    render () {
        const searchParams = new URLSearchParams(this.props.location.search);
        const title = searchParams.get('title');
        return (
            <div>
                {/*<h1>{this.props.match.params.title}</h1>*/}
                {title && <h1>{title}</h1>}
                {/*{title ? <h1>{title}</h1> : <Redirect to="/course"/>}*/}
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;