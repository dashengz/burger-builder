import React, { Component } from 'react';
import NotFound from "../../components/NotFound/NotFound";
import {Route} from "react-router-dom";

class Course extends Component {
    render () {
        const searchParams = new URLSearchParams(this.props.location.search);
        const id = this.props.match.params.id;
        const title = searchParams.get('title');
        const course = (
            <div>
                {/*<h1>{this.props.match.params.title}</h1>*/}
                {title && <h1>{title}</h1>}
                {/*{title ? <h1>{title}</h1> : <Redirect to="/course"/>}*/}
                <p>You selected the Course with ID: {id}</p>
            </div>
        );
        const isValid = this.props.validCourses.filter(c => c.id === +id && c.title === title).length !== 0;
        return isValid ? course : <Route render={(props) => <NotFound {...props} type="Course"/>} />;
    }
}

export default Course;